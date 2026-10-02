import { portfolio } from '@/content/portfolio';
import type { Locale } from '@/lib/locale';

import { copy, formatPeriod, formatTechnology } from './copy';
import {
  CompactList,
  CompactRow,
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

function CareerPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.career}</h2>

      <ItemList ordered>
        {portfolio.experience.map((entry) => (
          <Item key={`${entry.organization.en}-${entry.period}`} linked>
            <ItemHeader
              title={entry.role[locale]}
              meta={
                <>
                  <StretchedLink href={entry.url}>
                    <span className='text-tertiary'>{entry.organization[locale]}</span>
                  </StretchedLink>
                  <span className='text-on-surface-variant tabular-nums'>
                    {' · '}
                    {formatPeriod(entry.period, locale)}
                  </span>
                </>
              }
              end={<LinkArrow />}
            />
            <ItemText>{entry.description[locale]}</ItemText>
          </Item>
        ))}
      </ItemList>

      <Subsection id='teaching-heading' heading={t.teachingHeading}>
        <CompactList>
          {portfolio.teaching.map((topic) => (
            <CompactRow key={topic.en} label={topic[locale]}>
              <TechList items={topic.technologies.map((name) => formatTechnology(name, locale))} />
            </CompactRow>
          ))}
        </CompactList>
        <ProfileLink href={portfolio.linkedin}>{t.moreOnLinkedIn}</ProfileLink>
      </Subsection>
    </div>
  );
}

export { CareerPanel };
