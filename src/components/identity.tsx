import { ArrowUpRight, Briefcase, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { portfolio } from '@/content/portfolio';

import { copy } from './copy';
import type { Locale, Section } from './copy';
import { Portrait } from './portrait';
import { SiteControls } from './site-controls';

function Identity({ locale, section, ticks }: { locale: Locale; section: Section; ticks: number }) {
  const t = copy[locale];
  const [current] = portfolio.experience;
  const [role, rest] = current
    ? t.currentRole(current.role[locale], current.organization, current.period.split('-')[0] ?? '')
    : ['', ''];

  return (
    <section
      aria-labelledby='identity-name'
      className='rounded-xl-inc bg-surface-container-low flex flex-col gap-5 p-5 sm:p-6 lg:self-start lg:p-7'
    >
      <div className='flex items-center gap-4 sm:gap-5'>
        <Portrait locale={locale} ticks={ticks} />
        <div className='min-w-0'>
          <h1
            id='identity-name'
            className='type-headline-md text-on-surface sm:type-headline-lg font-emphasized'
          >
            {portfolio.name}
          </h1>
          <p className='type-title-md text-primary mt-1 font-medium'>
            {portfolio.identity[locale]}
          </p>
        </div>
      </div>

      <p className='type-body-lg text-on-surface'>{portfolio.introduction[locale]}</p>

      <ul aria-label={t.strengthsLabel} className='flex flex-wrap gap-2'>
        {portfolio.coreStrengths.map((strength) => (
          <li
            key={strength.en}
            className='bg-secondary-container type-label-lg text-on-secondary-container inline-flex h-8 items-center rounded-sm px-3 font-medium'
          >
            {strength[locale]}
          </li>
        ))}
      </ul>

      {current ? (
        <p className='border-outline-variant type-body-md text-on-surface-variant flex gap-3 border-t pt-4'>
          <Briefcase aria-hidden className='text-primary mt-0.5 size-4 shrink-0' />
          <span>
            <span className='text-on-surface font-medium'>{role}</span>
            {rest}
          </span>
        </p>
      ) : null}

      <ul aria-label={t.contactLabel} className='flex flex-wrap gap-2'>
        <li>
          <Button
            onClick={() => {
              globalThis.location.href = `mailto:${globalThis.atob(portfolio.emailEncoded)}`;
            }}
          >
            <Mail aria-hidden />
            {t.email}
          </Button>
        </li>
        <li>
          <Button asChild variant='tonal'>
            <a href={portfolio.github}>
              GitHub
              <ArrowUpRight aria-hidden className='size-4' />
            </a>
          </Button>
        </li>
        <li>
          <Button asChild variant='tonal'>
            <a href={portfolio.linkedin}>
              LinkedIn
              <ArrowUpRight aria-hidden className='size-4' />
            </a>
          </Button>
        </li>
      </ul>

      <SiteControls locale={locale} section={section} />
    </section>
  );
}

export { Identity };
