import { Fragment } from 'react';

import { portfolio } from '@/content/portfolio';

import { copy, formatDate } from './copy';
import type { Locale } from './copy';
import { ExternalLink } from './section-parts';

function WorkflowPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { aiRecommendations } = portfolio;

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='sr-only'>{t.sectionHeadings.workflow}</h2>

      <ul className='grid gap-1 md:grid-cols-3'>
        {portfolio.interests.map((interest) => (
          <li
            key={interest.id}
            className='bg-surface-container-low first:rounded-t-xl-inc last:rounded-b-xl-inc md:first:rounded-s-xl-inc md:last:rounded-e-xl-inc rounded-xs p-5 md:first:rounded-tr-xs md:last:rounded-bl-xs'
          >
            <h3 className='type-title-md text-on-surface font-semibold'>
              {interest.title[locale]}
            </h3>
            <p className='type-body-md text-on-surface-variant mt-2'>
              {interest.description[locale]}
            </p>
          </li>
        ))}
      </ul>

      <section
        aria-labelledby='ai-heading'
        className='rounded-xl-inc bg-surface-container p-5 sm:p-6'
      >
        <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
          <h3 id='ai-heading' className='type-title-lg text-on-surface font-semibold'>
            {t.aiHeading}
          </h3>
          <p className='type-label-md text-on-surface-variant'>
            {t.updated}{' '}
            <time dateTime={aiRecommendations.updated} className='tabular-nums'>
              {formatDate(aiRecommendations.updated, locale)}
            </time>
          </p>
        </div>
        <p className='type-body-md text-on-surface-variant mt-2 max-w-[68ch]'>
          {aiRecommendations.introduction[locale]}
        </p>
        <table className='mt-4 w-full border-collapse text-start'>
          <thead>
            <tr className='border-outline-variant border-b'>
              <th
                scope='col'
                className='type-label-md text-on-surface-variant py-2 pe-3 text-start font-medium'
              >
                {t.aiColumns.task}
              </th>
              <th
                scope='col'
                className='type-label-md text-on-surface-variant py-2 pe-3 text-start font-medium'
              >
                {t.aiColumns.model}
              </th>
              <th
                scope='col'
                className='type-label-md text-on-surface-variant py-2 text-start font-medium'
              >
                {t.aiColumns.effort}
              </th>
            </tr>
          </thead>
          <tbody className='divide-outline-variant divide-y'>
            {aiRecommendations.items.map((item) => (
              <tr key={item.task.en} className='align-top'>
                <th scope='row' className='py-3 pe-3 text-start font-normal'>
                  <span className='type-body-md text-on-surface block font-medium'>
                    {item.task[locale]}
                  </span>
                  <span className='type-body-sm text-on-surface-variant block'>
                    {item.note[locale]}
                  </span>
                </th>
                <td className='type-body-md text-on-surface py-3 pe-3 whitespace-nowrap'>
                  {item.model}
                </td>
                <td className='type-body-md text-on-surface py-3'>
                  <span className='bg-primary-container type-label-md text-on-primary-container inline-flex h-6 items-center rounded-xs px-2 font-medium'>
                    {item.effort}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <BuildSection locale={locale} />
    </div>
  );
}

// Choices rather than a badge inventory: topic, stack and the reason, in the
// same row rhythm as the career list. Only named tools with a link get one.
function BuildSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { portfolioBuild } = portfolio;

  return (
    <section
      aria-labelledby='build-heading'
      className='rounded-xl-inc bg-surface-container-low p-5 sm:p-6'
    >
      <h3 id='build-heading' className='type-title-lg text-on-surface font-semibold'>
        {t.buildHeading}
      </h3>
      <dl className='divide-outline-variant mt-3 divide-y'>
        {portfolioBuild.items.map((item) => (
          <div
            key={item.id}
            className='grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]'
          >
            <dt className='type-body-md text-on-surface-variant'>{item.topic[locale]}</dt>
            <dd>
              <p className='type-body-lg text-on-surface font-medium'>
                {item.technologies.map((name, index) => {
                  const url = portfolioBuild.links.find((link) => link.name === name)?.url;

                  return (
                    <Fragment key={name}>
                      {index > 0 ? ', ' : null}
                      {url ? <ExternalLink href={url}>{name}</ExternalLink> : name}
                    </Fragment>
                  );
                })}
              </p>
              <p className='type-body-md text-on-surface-variant mt-0.5 max-w-[68ch]'>
                {item.description[locale]}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export { WorkflowPanel };
