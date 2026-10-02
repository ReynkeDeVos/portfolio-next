import { portfolio } from '@/content/portfolio';

import { copy, formatTechnology } from './copy';
import type { Locale } from './copy';
import { Item, ItemHeader, ItemList, ItemText, TechList } from './section-parts';

function SkillsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.skills}</h2>

      <ItemList>
        {portfolio.skills.map((group) => (
          <Item key={group.id}>
            <ItemHeader title={group.title[locale]} />
            <ItemText>{group.description[locale]}</ItemText>
            <TechList
              items={group.technologies.map((name) => formatTechnology(name, locale))}
              className='mt-4'
            />
          </Item>
        ))}
      </ItemList>
    </div>
  );
}

export { SkillsPanel };
