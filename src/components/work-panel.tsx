import { CodeXml } from 'lucide-react';

import { contentFor } from '@/content/content';
import type { SelectedProject } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import {
  Card,
  CardGrid,
  CardHeader,
  CardText,
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  LinkArrow,
  ProfileLink,
  StretchedLink,
  Subsection,
  TechList,
} from './section-parts';

function ProjectLink({ project, locale }: { project: SelectedProject; locale: Locale }) {
  return (
    <StretchedLink href={project.url} locale={locale}>
      {project.name}
      <span className='sr-only'>, {uiText[locale].sourceOnGitHub}</span>
    </StretchedLink>
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
          <Item key={project.id} linked>
            <ItemHeader
              title={<ProjectLink project={project} locale={locale} />}
              meta={project.category}
              end={<LinkArrow />}
            />
            <ItemText>{project.description}</ItemText>
            <p className='type-body-md text-on-surface-variant mt-2 max-w-[72ch]'>
              {project.details}
            </p>
            {/* How it works, for technical readers: the plain-language text
                above stays readable without it. */}
            {project.engineering ? (
              <p className='type-body-md text-on-surface-variant mt-3 flex max-w-[72ch] gap-2'>
                <CodeXml aria-hidden className='text-primary mt-0.5 size-4 shrink-0' />
                <span>
                  <span className='text-on-surface font-medium'>{t.underTheHood}: </span>
                  {project.engineering}
                </span>
              </p>
            ) : null}
            <TechList items={project.technologies} className='mt-4' />
          </Item>
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
