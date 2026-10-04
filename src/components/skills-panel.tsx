import { Blocks, Braces, Database, Rocket, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';

import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { shapePolygon } from '@/lib/shapes';
import type { ShapeName } from '@/lib/shapes';
import { uiText } from '@/ui-text/ui-text';

import { Item, ItemHeader, ItemList, ItemText, TechList } from './section-parts';

// Each skill group leads with its own shape from the Expressive set, so the
// groups read apart at a glance and the Portrait's cookie has relatives.
const groupMarks: Record<string, { shape: ShapeName; Icon: typeof Braces }> = {
  languages: { shape: 'cookie4', Icon: Braces },
  web: { shape: 'pentagon', Icon: Blocks },
  backend: { shape: 'cookie9', Icon: Database },
  quality: { shape: 'sunny', Icon: Rocket },
  'ai-tools': { shape: 'softBurst', Icon: Sparkles },
};

const fallbackMark = groupMarks.languages ?? { shape: 'cookie4', Icon: Braces };

function GroupMark({ id }: { id: string }) {
  const { shape, Icon } = groupMarks[id] ?? fallbackMark;
  const outline: CSSProperties = { '--group-shape': shapePolygon(shape) };

  return (
    <span
      aria-hidden
      style={outline}
      className='bg-primary-container text-on-primary-container grid size-12 shrink-0 place-items-center [clip-path:var(--group-shape)]'
    >
      <Icon className='size-5' />
    </span>
  );
}

function SkillsPanel({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { skills } = contentFor(locale);

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.skills}</h2>

      <ItemList>
        {skills.map((group) => (
          <Item key={group.id}>
            <ItemHeader title={group.title} lead={<GroupMark id={group.id} />} />
            <ItemText>{group.description}</ItemText>
            <TechList items={group.technologies} className='mt-4' />
          </Item>
        ))}
      </ItemList>
    </div>
  );
}

export { SkillsPanel };
