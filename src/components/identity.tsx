import { ArrowUpRight, Briefcase, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { portfolio } from '@/content/portfolio';

import { copy } from './copy';
import type { Locale, Section } from './copy';
import { Portrait } from './portrait';
import { SiteControls } from './site-controls';

// Both translations share a grid cell so the larger one sets the space,
// even before hydration. Only the active language is visible or announced.
function LocalizedContent({
  locale,
  children,
}: {
  locale: Locale;
  children: (language: Locale) => ReactNode;
}) {
  return (
    <span className='grid min-w-0'>
      {(['en', 'de'] as const).map((language) => (
        <span
          key={language}
          lang={language}
          aria-hidden={language !== locale}
          className={
            language === locale
              ? 'col-start-1 row-start-1'
              : 'invisible col-start-1 row-start-1 select-none'
          }
        >
          {children(language)}
        </span>
      ))}
    </span>
  );
}

function Identity({ locale, section, ticks }: { locale: Locale; section: Section; ticks: number }) {
  const t = copy[locale];
  const [current] = portfolio.experience;

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
            <LocalizedContent locale={locale}>
              {(language) => portfolio.identity[language]}
            </LocalizedContent>
          </p>
          <p className='type-body-md text-on-surface-variant mt-1'>
            <LocalizedContent locale={locale}>
              {(language) => portfolio.location[language]}
            </LocalizedContent>
          </p>
        </div>
      </div>

      <p className='type-body-lg text-on-surface'>
        <LocalizedContent locale={locale}>
          {(language) => portfolio.introduction[language]}
        </LocalizedContent>
      </p>

      <ul aria-label={t.strengthsLabel} className='flex flex-wrap gap-2'>
        {portfolio.coreStrengths.map((strength) => (
          <li
            key={strength.en}
            className='bg-secondary-container type-label-lg text-on-secondary-container inline-flex h-8 items-center rounded-sm px-3 font-medium'
          >
            <LocalizedContent locale={locale}>{(language) => strength[language]}</LocalizedContent>
          </li>
        ))}
      </ul>

      {current ? (
        <p className='border-outline-variant type-body-md text-on-surface-variant flex gap-3 border-t pt-4'>
          <Briefcase aria-hidden className='text-primary mt-0.5 size-4 shrink-0' />
          <LocalizedContent locale={locale}>
            {(language) => {
              const [role, rest] = copy[language].currentRole(
                current.role[language],
                current.organization[language],
                current.period.split('-')[0] ?? '',
              );

              return (
                <>
                  <span className='text-on-surface font-medium'>{role}</span>
                  {rest}
                </>
              );
            }}
          </LocalizedContent>
        </p>
      ) : null}

      <ul aria-label={t.contactLabel} className='flex flex-wrap gap-2'>
        <li>
          <Button
            onClick={() => {
              // Reviewed: the target is a mailto: link to the build-validated address.
              // fallow-ignore-next-line security-sink
              globalThis.location.href = `mailto:${globalThis.atob(portfolio.emailEncoded)}`;
            }}
          >
            <Mail aria-hidden />
            <LocalizedContent locale={locale}>
              {(language) => copy[language].email}
            </LocalizedContent>
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
