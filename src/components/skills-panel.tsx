import { portfolio } from '@/content/portfolio';

import { copy } from './copy';
import type { Locale } from './copy';
import { TechList } from './section-parts';

function SkillsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div>
      <h2 className='sr-only'>{t.sectionHeadings.skills}</h2>
      <ul className='divide-outline-variant rounded-xl-inc bg-surface-container-low divide-y px-5 sm:px-6'>
        {portfolio.skills.map((group) => (
          <li
            key={group.id}
            className='grid gap-x-6 gap-y-2 py-5 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]'
          >
            <h3 className='type-title-md text-on-surface font-semibold'>{group.title[locale]}</h3>
            <div className='flex flex-col gap-3'>
              <p className='type-body-md text-on-surface-variant max-w-[68ch]'>
                {group.description[locale]}
              </p>
              <TechList items={group.technologies} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { SkillsPanel };
