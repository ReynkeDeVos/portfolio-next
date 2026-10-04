import { Blocks, Braces, Database, Rocket, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { outlinePolygon } from '@/lib/outlines';
import type { OutlineName } from '@/lib/outlines';
import { uiText } from '@/ui-text/ui-text';

import { Item, ItemHeader, ItemList, ItemText, TechList } from './section-parts';

// Each skill group leads with its own outline from the Expressive set, so
// the groups read apart at a glance and the Portrait's cookie has relatives.
// Content may add a group before it has a mark; it borrows the first one.
type GroupMark = { outline: OutlineName; Icon: LucideIcon };

const defaultMark: GroupMark = { outline: 'cookie4', Icon: Braces };

const groupMarks = new Map<string, GroupMark>([
  ['languages', defaultMark],
  ['web', { outline: 'pentagon', Icon: Blocks }],
  ['backend', { outline: 'cookie9', Icon: Database }],
  ['quality', { outline: 'sunny', Icon: Rocket }],
  ['ai-tools', { outline: 'softBurst', Icon: Sparkles }],
]);

function GroupMarkBadge({ id }: { id: string }) {
  const { outline, Icon } = groupMarks.get(id) ?? defaultMark;
  const clip: CSSProperties = { '--group-outline': outlinePolygon(outline) };

  return (
    <span
      aria-hidden
      style={clip}
      className='bg-primary-container text-on-primary-container grid size-12 shrink-0 place-items-center [clip-path:var(--group-outline)]'
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
            <ItemHeader title={group.title} lead={<GroupMarkBadge id={group.id} />} />
            <ItemText>{group.description}</ItemText>
            <TechList items={group.technologies} className='mt-4' />
          </Item>
        ))}
      </ItemList>
    </div>
  );
}

export { SkillsPanel };
