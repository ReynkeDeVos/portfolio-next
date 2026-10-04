import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import {
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  LinkArrow,
  ProfileLink,
  StretchedLink,
  Subsection,
} from './section-parts';

function CareerPanel({ locale }: { locale: Locale }) {
  const t = uiText[locale];
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
                  <StretchedLink href={entry.url} locale={locale}>
                    <span className='text-tertiary'>{entry.organization}</span>
                  </StretchedLink>
                  <span className='text-on-surface-variant tabular-nums'>
                    {' · '}
                    {t.period(entry.period)}
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
        {/* Dense rows inside one card surface instead of a wall of identical
            cards or tags. Label left, technologies right from md, as quiet
            running text: the topics carry the row, the tools only detail it. */}
        <ul className='rounded-lg-inc bg-surface-card divide-outline-variant divide-y px-5'>
          {career.teaching.map((topic) => (
            <li
              key={topic.id}
              className='flex flex-col gap-2 py-4 md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-6'
            >
              <h4 className='type-title-sm text-on-surface font-semibold md:pt-0.5'>
                {topic.topic}
              </h4>
              {/* Each name keeps its separator, so a wrapped line never
                  starts with one. */}
              <ul className='type-body-md text-on-surface-variant flex flex-wrap gap-x-1.5 md:pt-px'>
                {topic.technologies.map((technology) => (
                  <li
                    key={technology}
                    className='whitespace-nowrap after:ms-1.5 after:content-["·"] last:after:content-none'
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <ProfileLink href={profile.linkedin} locale={locale}>
          {t.moreOnLinkedIn}
        </ProfileLink>
      </Subsection>
    </div>
  );
}

export { CareerPanel };
