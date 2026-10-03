import { contentFor } from '@/content/content';
import { copy } from '@/copy/copy';
import type { Locale } from '@/lib/locale';

import { Item, ItemHeader, ItemList, ItemText, TechList } from './section-parts';

function SkillsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { skills } = contentFor(locale);

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.skills}</h2>

      <ItemList>
        {skills.map((group) => (
          <Item key={group.id}>
            <ItemHeader title={group.title} />
            <ItemText>{group.description}</ItemText>
            <TechList items={group.technologies} className='mt-4' />
          </Item>
        ))}
      </ItemList>
    </div>
  );
}

export { SkillsPanel };
