import { cn } from 'cn';
import { ArrowUpRight } from 'lucide-react';
import { Fragment } from 'react';

import { portfolio } from '@/content/portfolio';
import { selectedWork } from '@/content/selected-work';
import type { SelectedProject } from '@/content/selected-work';

import { copy, formatDate, formatPeriod } from './copy';
import type { Locale } from './copy';

function TechList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className='bg-surface-container-highest type-label-md text-on-surface-variant rounded-xs px-2 py-0.5 font-medium'
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

// The project name is the link; its ::after stretches over the whole item.
// The item draws the focus ring and rises above its closely spaced neighbours.
function ProjectLink({ project, locale }: { project: SelectedProject; locale: Locale }) {
  return (
    <a
      href={project.url}
      className='text-on-surface cursor-pointer outline-none after:absolute after:inset-0 after:cursor-pointer'
    >
      {project.name}
      <span className='sr-only'>, {copy[locale].sourceOnGitHub}</span>
    </a>
  );
}

// A stationary arrow, like the contact buttons, marks the link target.
function LinkArrow() {
  return <ArrowUpRight aria-hidden className='text-on-surface size-5 shrink-0' />;
}

// Inline external link. The word joiner keeps the arrow on the line of the
// name's last character while long names still wrap anywhere.
function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-on-surface cursor-pointer rounded-xs wrap-anywhere'
    >
      {children}
      <span className='whitespace-nowrap'>
        {'\u2060'}
        <ArrowUpRight aria-hidden className='ms-0.5 inline size-[1em] align-[-0.125em]' />
      </span>
    </a>
  );
}

function WorkPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { featured, supporting } = selectedWork.forLocale(locale);

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='sr-only'>{t.sectionHeadings.work}</h2>

      {/* Connected Expressive list: large outer corners, small inner ones. */}
      <ol className='flex flex-col gap-1'>
        {featured.map((project) => (
          <li
            key={project.id}
            className='group bg-surface-container-low before:bg-on-surface before:ease-effects-fast first:rounded-t-xl-inc last:rounded-b-xl-inc has-[a:focus-visible]:focus-ring relative rounded-xs px-5 py-5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-6 has-[a:focus-visible]:z-10 sm:px-6'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='min-w-0'>
                <h3 className='type-title-lg text-on-surface font-semibold'>
                  <ProjectLink project={project} locale={locale} />
                </h3>
                <p className='type-label-lg text-tertiary mt-0.5 font-medium'>{project.category}</p>
              </div>
              <LinkArrow />
            </div>
            <p className='type-body-lg text-on-surface mt-3 max-w-[64ch]'>{project.description}</p>
            <p className='type-body-md text-on-surface-variant mt-2 max-w-[72ch]'>
              {project.details}
            </p>
            <TechList items={project.technologies} className='mt-4' />
          </li>
        ))}
      </ol>

      <section aria-labelledby='more-work' className='flex flex-col gap-3'>
        <h3 id='more-work' className='type-title-md text-on-surface px-1 font-semibold'>
          {t.moreWork}
        </h3>
        <ul className='grid gap-3 md:grid-cols-2'>
          {supporting.map((project) => (
            <li
              key={project.id}
              className='group rounded-lg-inc bg-surface-container before:bg-on-surface before:ease-effects-fast has-[a:focus-visible]:focus-ring relative flex flex-col p-5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-6 has-[a:focus-visible]:z-10'
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <h4 className='type-title-md text-on-surface font-semibold'>
                    <ProjectLink project={project} locale={locale} />
                  </h4>
                  <p className='type-label-md text-on-surface-variant font-medium'>
                    {project.category}
                  </p>
                </div>
                <LinkArrow />
              </div>
              <p className='type-body-md text-on-surface mt-2'>{project.description}</p>
              <p className='type-body-sm text-on-surface-variant mt-2'>{project.details}</p>
              <TechList items={project.technologies} className='mt-auto pt-3' />
            </li>
          ))}
        </ul>
        <p className='type-body-md px-1'>
          <ExternalLink href={portfolio.github}>{t.moreOnGitHub}</ExternalLink>
        </p>
      </section>
    </div>
  );
}

function SkillsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div>
      <h2 className='sr-only'>{t.sectionHeadings.skills}</h2>
      <ul className='divide-outline-variant rounded-xl-inc bg-surface-container-low divide-y px-5 sm:px-6'>
        {portfolio.skills.map((group) => (
          <li
            key={group.id}
            className='grid gap-x-6 gap-y-2 py-5 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]'
          >
            <h3 className='type-title-md text-on-surface font-semibold'>{group.title[locale]}</h3>
            <div className='flex flex-col gap-3'>
              <p className='type-body-md text-on-surface-variant max-w-[68ch]'>
                {group.description[locale]}
              </p>
              <TechList items={group.technologies} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      <p className='type-body-md text-on-surface-variant mt-1 max-w-[68ch]'>
        {portfolioBuild.introduction[locale]}
      </p>
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
                {topic.technologies.join(', ')}
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

export { CareerPanel, SkillsPanel, WorkflowPanel, WorkPanel };
