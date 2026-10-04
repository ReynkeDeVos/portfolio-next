import { ChevronDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { dismissEngineNote } from '@/lib/engine';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import { BrowserMascot } from './browser-mascot';
import { useSectionNavigation } from './section-navigation';

// Prerendered for everyone; the head script reveals it outside Chromium before
// first paint. The explanation stays one click away so the note keeps quiet.
function EngineNote({ locale }: { locale: Locale }) {
  const t = uiText[locale].engineNote;
  const { focusOpenSection } = useSectionNavigation();

  return (
    <aside
      aria-labelledby='engine-note-title'
      className='rounded-lg-inc bg-surface-card text-on-surface hidden grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 py-4 ps-4 pe-2 in-data-[engine-note=shown]:grid sm:gap-x-4 sm:ps-5'
    >
      <BrowserMascot />
      <div className='min-w-0'>
        <h2 id='engine-note-title' className='type-title-md font-semibold'>
          {t.title}
        </h2>
        <p className='type-body-md text-on-surface-variant mt-1 max-w-[72ch]'>{t.lead}</p>
        <details className='group/why mt-1'>
          <summary className='type-label-lg before:ease-effects-fast before:rounded-inherit relative -ms-3 inline-flex h-8 cursor-pointer list-none items-center gap-1 rounded-full px-3 font-medium select-none before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-8 [&::-webkit-details-marker]:hidden'>
            {t.why}
            <ChevronDown
              aria-hidden
              className='ease-spatial size-4 transition-transform duration-300 group-open/why:rotate-180'
            />
          </summary>
          <div className='flex flex-col gap-2 py-1'>
            {t.details.map((paragraph) => (
              <p key={paragraph} className='type-body-md text-on-surface-variant max-w-[72ch]'>
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      </div>
      <Button
        variant='standard'
        size='icon-sm'
        aria-label={t.dismiss}
        title={t.dismiss}
        className='-mt-1'
        onClick={() => {
          dismissEngineNote();
          // Keep keyboard users in place: the open Section follows the note.
          focusOpenSection();
        }}
      >
        <X aria-hidden />
      </Button>
    </aside>
  );
}

export { EngineNote };
