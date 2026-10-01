import { portfolio } from '@/content/portfolio';

import { copy, formatPeriod, formatTechnology } from './copy';
import type { Locale } from './copy';
import { ExternalLink } from './section-parts';

function CareerPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='sr-only'>{t.sectionHeadings.career}</h2>

      <section
        aria-labelledby='experience-heading'
        className='rounded-xl-inc bg-surface-container-low p-5 sm:p-6'
      >
        <h3 id='experience-heading' className='type-title-lg text-on-surface font-semibold'>
          {t.experienceHeading}
        </h3>
        <ol className='divide-outline-variant mt-3 divide-y'>
          {portfolio.experience.map((entry) => (
            <li
              key={`${entry.organization.en}-${entry.period}`}
              className='grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]'
            >
              <p className='type-body-md text-on-surface-variant tabular-nums'>
                {formatPeriod(entry.period, locale)}
              </p>
              <div>
                <p className='type-body-lg text-on-surface font-medium'>{entry.role[locale]}</p>
                <p className='type-body-md text-on-surface-variant'>
                  <ExternalLink href={entry.url}>{entry.organization[locale]}</ExternalLink>
                </p>
                <p className='type-body-sm text-on-surface-variant mt-1 max-w-[68ch]'>
                  {entry.description[locale]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby='teaching-heading'
        className='rounded-xl-inc bg-surface-container p-5 sm:p-6'
      >
        <h3 id='teaching-heading' className='type-title-lg text-on-surface font-semibold'>
          {t.teachingHeading}
        </h3>
        <ul className='mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2'>
          {portfolio.teaching.map((topic) => (
            <li key={topic.en}>
              <p className='type-body-md text-on-surface font-medium'>{topic[locale]}</p>
              <p className='type-body-sm text-on-surface-variant'>
                {topic.technologies.map((name) => formatTechnology(name, locale)).join(', ')}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className='type-body-md px-1'>
        <ExternalLink href={portfolio.linkedin}>{t.moreOnLinkedIn}</ExternalLink>
      </p>
    </div>
  );
}

export { CareerPanel };
