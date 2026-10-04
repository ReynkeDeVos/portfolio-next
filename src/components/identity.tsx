import { Briefcase, Check, Copy, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import { Portrait } from './portrait/portrait';
import { ProfileLink } from './section-parts';
import { SiteControls } from './site-controls';

function Identity({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { profile } = contentFor(locale);
  const { currentRole } = profile;

  const [role, rest] = currentRole ? t.currentRole(currentRole) : ['', ''];

  return (
    <section
      aria-labelledby='identity-name'
      className='rounded-xl-inc bg-surface-group @container/identity flex flex-col gap-5 p-5 sm:p-6 lg:top-6 lg:self-start lg:p-7 lg:[@media(min-height:46rem)]:sticky'
    >
      <div className='flex items-center gap-4 sm:gap-5'>
        <Portrait locale={locale} />
        <div className='min-w-0'>
          <h1
            id='identity-name'
            className='type-headline-md text-on-surface sm:type-headline-lg font-emphasized'
          >
            {profile.name}
          </h1>
          <p className='type-title-md text-primary mt-1 font-medium'>{profile.identity}</p>
          <p className='type-body-md text-on-surface-variant mt-1'>{profile.location}</p>
        </div>
      </div>

      <p className='type-body-lg text-on-surface'>{profile.introduction}</p>

      <ul aria-label={t.strengthsLabel} className='flex flex-wrap gap-2'>
        {profile.coreStrengths.map((strength) => (
          <li
            key={strength.id}
            className='bg-surface-container-highest type-label-lg text-on-surface inline-flex h-8 items-center rounded-sm px-3 font-medium'
          >
            {strength.name}
          </li>
        ))}
      </ul>

      {currentRole ? (
        <p className='border-outline-variant type-body-md text-on-surface-variant flex gap-3 border-t pt-4'>
          <Briefcase aria-hidden className='text-primary mt-0.5 size-4 shrink-0' />
          <span>
            <span className='text-on-surface font-medium'>{role}</span>
            {rest}
          </span>
        </p>
      ) : null}

      <Contact locale={locale} />

      <SiteControls locale={locale} />
    </section>
  );
}

// The address stays out of the HTML until it is asked for. Email, the
// leading half of an Expressive split button, opens the mail app and also
// shows the address, so a missing mail app is no dead end; the trailing half
// copies it. A failed copy shows the address instead. Both outcomes are
// announced. Narrow profiles give the split button its own row and share the
// next between the two profile links.
function Contact({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { emailEncoded, github, linkedin } = contentFor(locale).profile;
  const [address, setAddress] = useState<string>();
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const decode = () => globalThis.atob(emailEncoded);

  // A repeated message gains a trailing no-break space, so the live region
  // still changes and the outcome is announced again.
  const announce = (message: string) => {
    setAnnouncement((current) => (current === message ? `${message}\u00A0` : message));
  };

  // The check and the announcement clear after a moment.
  async function copyAddress() {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    const value = decode();
    setCopied(false);

    try {
      await globalThis.navigator.clipboard.writeText(value);
      setCopied(true);
      announce(t.addressCopied);
      resetTimer.current = setTimeout(() => {
        setCopied(false);
        setAnnouncement('');
      }, 2000);
    } catch {
      setAddress(value);
      announce(t.copyFailed);
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <ul
        aria-label={t.contactLabel}
        className='grid grid-cols-2 gap-2 @min-[23rem]/identity:flex @min-[23rem]/identity:flex-wrap'
      >
        <li className='col-span-2 flex gap-0.5'>
          <Button
            size='split-start'
            className='flex-1'
            onClick={() => {
              const decoded = decode();
              setAddress(decoded);
              announce(t.addressShown(decoded));
              // Reviewed: the target is a mailto: link to the build-validated address.
              // fallow-ignore-next-line security-sink
              globalThis.location.href = `mailto:${decoded}`;
            }}
          >
            <Mail aria-hidden />
            {t.email}
          </Button>
          <Button
            size='split-end'
            aria-label={t.copyAddress}
            title={t.copyAddress}
            onClick={() => {
              void copyAddress();
            }}
          >
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
          </Button>
        </li>
        <li>
          <ProfileLink href={github} locale={locale} className='grid'>
            GitHub
          </ProfileLink>
        </li>
        <li>
          <ProfileLink href={linkedin} locale={locale} className='grid'>
            LinkedIn
          </ProfileLink>
        </li>
      </ul>

      {address ? (
        <p className='bg-surface-container-high type-body-md text-on-surface rounded-full px-4 py-2 break-all select-all'>
          {address}
        </p>
      ) : null}
      <p aria-live='polite' className='sr-only'>
        {announcement}
      </p>
    </div>
  );
}

export { Identity };
