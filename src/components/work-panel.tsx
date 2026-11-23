import { cn } from 'cn';
import { ChevronDown, CodeXml } from 'lucide-react';

import { contentFor } from '@/content/content';
import type { SelectedProject } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import {
  Card,
  CardGrid,
  CardHeader,
  CardText,
  ItemHeader,
  ItemList,
  ItemText,
  LinkArrow,
  ProfileLink,
  StretchedLink,
  Subsection,
  TechList,
  disclosureSummary,
  linkedItem,
} from './section-parts';

function ProjectLink({ project, locale }: { project: SelectedProject; locale: Locale }) {
  return (
    <StretchedLink href={project.url} locale={locale}>
      {project.name}
      <span className='sr-only'>, {uiText[locale].sourceOnGitHub}</span>
    </StretchedLink>
  );
}

// Each featured Project shows a plain-language summary up front for quick
// scanning and keeps technical context one click away inside a native
// disclosure, separated from the stretched GitHub link above it.
function FeaturedProject({ project, locale }: { project: SelectedProject; locale: Locale }) {
  const t = uiText[locale];

  return (
    <li className='bg-surface-group group/card first:rounded-t-xl-inc last:rounded-b-xl-inc relative rounded-xs'>
      <div
        className={cn(
          'group-first/card:rounded-t-xl-inc relative rounded-xs px-5 pt-5 pb-4 sm:px-6',
          linkedItem,
        )}
      >
        <ItemHeader
          title={<ProjectLink project={project} locale={locale} />}
          meta={project.category}
          end={<LinkArrow />}
        />
        <ItemText>{project.description}</ItemText>
        <TechList items={project.technologies} className='mt-4' />
      </div>

      <div className='border-outline-variant mx-5 border-t py-2.5 sm:mx-6'>
        <details className='group/hood'>
          <summary className={disclosureSummary}>
            <CodeXml aria-hidden className='text-primary size-4 shrink-0' />
            <span>{t.underTheHood}</span>
            <ChevronDown
              aria-hidden
              className='ease-spatial size-4 transition-transform duration-200 group-open/hood:rotate-180'
            />
          </summary>
          <div className='workflow-disclosure-body flex flex-col gap-1.5 pt-2 pb-1.5'>
            {project.engineering ? (
              <p className='type-body-md text-on-surface max-w-[72ch]'>{project.engineering}</p>
            ) : null}
            <p className='type-body-sm text-on-surface-variant max-w-[72ch]'>{project.details}</p>
          </div>
        </details>
      </div>
    </li>
  );
}

function WorkPanel({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { work, profile } = contentFor(locale);
  const { featured, supporting } = work;

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.work}</h2>

      <ItemList ordered>
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} locale={locale} />
        ))}
      </ItemList>

      <Subsection id='more-work' heading={t.moreWork}>
        <CardGrid>
          {supporting.map((project) => (
            <Card key={project.id} linked>
              <CardHeader
                title={<ProjectLink project={project} locale={locale} />}
                meta={project.category}
                end={<LinkArrow />}
              />
              <CardText>{project.description}</CardText>
              <p className='type-body-sm text-on-surface-variant mt-2'>{project.details}</p>
              <TechList items={project.technologies} className='mt-auto pt-3' />
            </Card>
          ))}
        </CardGrid>
        <ProfileLink href={profile.github} locale={locale}>
          {t.moreOnGitHub}
        </ProfileLink>
      </Subsection>
    </div>
  );
}

export { WorkPanel };
