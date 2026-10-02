import { ArrowUpRight, Briefcase, Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import type { Section } from '@/lib/section';

import { copy } from './copy';
import { Portrait } from './portrait';
import { SiteControls } from './site-controls';

function Identity({ locale, section, ticks }: { locale: Locale; section: Section; ticks: number }) {
  const t = copy[locale];
  const { profile } = contentFor(locale);
  const { currentRole } = profile;

  const [role, rest] = currentRole
    ? t.currentRole(currentRole.role, currentRole.organization, currentRole.since)
    : ['', ''];

  return (
    <section
      aria-labelledby='identity-name'
      className='rounded-xl-inc bg-surface-group flex flex-col gap-5 p-5 sm:p-6 lg:top-6 lg:self-start lg:p-7 lg:[@media(min-height:46rem)]:sticky'
    >
      <div className='flex items-center gap-4 sm:gap-5'>
        <Portrait locale={locale} ticks={ticks} />
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

      <SiteControls locale={locale} section={section} />
    </section>
  );
}

// The address stays out of the HTML until Email is pressed. Pressing it opens
// the mail app and also shows the address, so a missing mail app is no dead end.
function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { emailEncoded, github, linkedin } = contentFor(locale).profile;
  const [address, setAddress] = useState<string>();
  const [copied, setCopied] = useState(false);

  // The address stays visible and selectable if the clipboard is unavailable.
  async function copyAddress(value: string) {
    try {
      await globalThis.navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <ul aria-label={t.contactLabel} className='flex flex-wrap gap-2'>
        <li>
          <Button
            onClick={() => {
              const decoded = globalThis.atob(emailEncoded);
              setAddress(decoded);
              // Reviewed: the target is a mailto: link to the build-validated address.
              // fallow-ignore-next-line security-sink
              globalThis.location.href = `mailto:${decoded}`;
            }}
          >
            <Mail aria-hidden />
            {t.email}
          </Button>
        </li>
        <li>
          <Button asChild variant='tonal'>
            <a href={github} target='_blank' rel='noopener noreferrer'>
              GitHub
              <ArrowUpRight aria-hidden className='size-4' />
            </a>
          </Button>
        </li>
        <li>
          <Button asChild variant='tonal'>
            <a href={linkedin} target='_blank' rel='noopener noreferrer'>
              LinkedIn
              <ArrowUpRight aria-hidden className='size-4' />
            </a>
          </Button>
        </li>
      </ul>

      {address ? (
        <p className='bg-surface-container-high flex items-center gap-2 rounded-full py-1 ps-4 pe-1'>
          <span className='type-body-md text-on-surface min-w-0 flex-1 break-all select-all'>
            {address}
          </span>
          <Button
            variant='standard'
            size='icon-sm'
            aria-label={t.copyAddress}
            title={t.copyAddress}
            onClick={() => {
              void copyAddress(address);
            }}
          >
            {copied ? <Check aria-hidden className='text-primary' /> : <Copy aria-hidden />}
          </Button>
        </p>
      ) : null}
      <p aria-live='polite' className='sr-only'>
        {copied ? t.addressCopied : ''}
      </p>
    </div>
  );
}

export { Identity };
