import { portfolio } from '@/content/portfolio';
import { selectedWork } from '@/content/selected-work';
import type { SelectedProject } from '@/content/selected-work';

import { copy } from './copy';
import type { Locale } from './copy';
import {
  Card,
  CardDetails,
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
    <StretchedLink href={project.url}>
      {project.name}
      <span className='sr-only'>, {copy[locale].sourceOnGitHub}</span>
    </StretchedLink>
  );
}

function WorkPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { featured, supporting } = selectedWork.forLocale(locale);

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
              <CardDetails>{project.details}</CardDetails>
              <TechList items={project.technologies} className='mt-auto pt-3' />
            </Card>
          ))}
        </CardGrid>
        <ProfileLink href={portfolio.github}>{t.moreOnGitHub}</ProfileLink>
      </Subsection>
    </div>
  );
}

export { WorkPanel };
