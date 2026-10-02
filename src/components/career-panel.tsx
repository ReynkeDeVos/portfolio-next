import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';

import { copy } from './copy';
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
  const { career, profile } = contentFor(locale);

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.career}</h2>

      <ItemList ordered>
        {career.experience.map((entry) => (
          <Item key={entry.id} linked>
            <ItemHeader
              title={entry.role}
              meta={
                <>
                  <StretchedLink href={entry.url}>
                    <span className='text-tertiary'>{entry.organization}</span>
                  </StretchedLink>
                  <span className='text-on-surface-variant tabular-nums'>
                    {' · '}
                    {entry.period}
                  </span>
                </>
              }
              end={<LinkArrow />}
            />
            <ItemText>{entry.description}</ItemText>
          </Item>
        ))}
      </ItemList>

      <Subsection id='teaching-heading' heading={t.teachingHeading}>
        <CompactList>
          {career.teaching.map((topic) => (
            <CompactRow key={topic.id} label={topic.topic}>
              <TechList items={topic.technologies} />
            </CompactRow>
          ))}
        </CompactList>
        <ProfileLink href={profile.linkedin}>{t.moreOnLinkedIn}</ProfileLink>
      </Subsection>
    </div>
  );
}

export { CareerPanel };
