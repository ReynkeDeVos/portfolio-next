import { ArrowUpRight } from 'lucide-react';

import { portfolio } from '@/content/portfolio';
import { selectedWork } from '@/content/selected-work';
import type { SelectedProject } from '@/content/selected-work';

import { copy } from './copy';
import type { Locale } from './copy';
import { ExternalLink, TechList } from './section-parts';

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
            className='group bg-surface-container-low before:bg-on-surface before:ease-effects-fast first:rounded-t-xl-inc last:rounded-b-xl-inc has-[a:focus-visible]:focus-ring before:rounded-inherit relative rounded-xs p-5 before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-6 has-[a:focus-visible]:z-10 sm:px-6'
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
              className='group rounded-lg-inc bg-surface-container before:bg-on-surface before:ease-effects-fast has-[a:focus-visible]:focus-ring before:rounded-inherit relative flex flex-col p-5 before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-6 has-[a:focus-visible]:z-10'
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

export { WorkPanel };
