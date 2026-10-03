import { useEffect } from 'react';

import type { Locale } from '@/lib/locale';

import { EngineNote } from './engine-note';
import { Identity } from './identity';
import { SectionNavigation, SectionTabs } from './section-navigation';

function PortfolioPage({ locale }: { locale: Locale }) {
  // Effects run children first, so once this one runs the whole page has
  // hydrated and run its own effects. Browser tests wait for this mark, since
  // the prerendered markup looks the same before React takes over.
  useEffect(() => {
    document.documentElement.dataset.hydrated = '';
  }, []);

  return (
    <div className='min-h-dvh'>
      <SectionNavigation>
        <main className='mx-auto grid w-full max-w-300 gap-4 px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]'>
          <Identity locale={locale} />

          <div className='flex min-w-0 flex-col gap-4'>
            <EngineNote locale={locale} />
            <SectionTabs locale={locale} />
          </div>
        </main>
      </SectionNavigation>
    </div>
  );
}

export { PortfolioPage };
