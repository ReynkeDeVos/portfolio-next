import { portfolio } from '@/content/portfolio';

import { copy, formatPeriod, formatTechnology } from './copy';
import type { Locale } from './copy';
import {
  Card,
  CardGrid,
  CardHeader,
  ExternalLink,
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  ProfileLink,
  Subsection,
  TechList,
} from './section-parts';

function CareerPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='sr-only'>{t.sectionHeadings.career}</h2>

      <ItemList ordered>
        {portfolio.experience.map((entry) => (
          <Item key={`${entry.organization.en}-${entry.period}`}>
            <ItemHeader
              title={entry.role[locale]}
              meta={
                <ExternalLink href={entry.url} className='text-tertiary'>
                  {entry.organization[locale]}
                </ExternalLink>
              }
              wrap
              end={
                <p className='type-label-lg text-on-surface-variant pt-1 tabular-nums'>
                  {formatPeriod(entry.period, locale)}
                </p>
              }
            />
            <ItemText>{entry.description[locale]}</ItemText>
          </Item>
        ))}
      </ItemList>

      <Subsection id='teaching-heading' heading={t.teachingHeading}>
        <CardGrid>
          {portfolio.teaching.map((topic) => (
            <Card key={topic.en}>
              <CardHeader title={topic[locale]} />
              <TechList
                items={topic.technologies.map((name) => formatTechnology(name, locale))}
                className='mt-3'
              />
            </Card>
          ))}
        </CardGrid>
        <ProfileLink href={portfolio.linkedin}>{t.moreOnLinkedIn}</ProfileLink>
      </Subsection>
    </div>
  );
}

export { CareerPanel };
