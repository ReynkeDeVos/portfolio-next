import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/button';
import { localePath, locales, rememberLocale } from '@/lib/locale';
import type { Locale } from '@/lib/locale';
import { sectionHash } from '@/lib/section';
import { revealTheme, useThemePreference } from '@/lib/theme';
import type { ThemePreference } from '@/lib/theme';
import { localeNames, uiText } from '@/ui-text/ui-text';

import { useSectionNavigation } from './section-navigation';

const themeIcons = { system: Monitor, light: Sun, dark: Moon } as const;

const themeOrder: ThemePreference[] = ['system', 'light', 'dark'];

const segmentGroup =
  'bg-surface-container-high relative isolate grid auto-cols-fr grid-flow-col gap-0.5 overflow-hidden rounded-full p-1';

// Each Locale has its own page, so a Locale link remounts these controls. The
// Locale the visitor just left lets the new page's pill start where the old
// one stood; the new page clears it, so Back and Forward simply appear.
let leftLocale: Locale | null = null;

// The selected pill of an equal-column group. It fills the first grid cell and
// slides to the selected one on the Section tabs' spatial spring; the group
// clips the overshoot. A freshly mounted pill starts from `from`.
function SegmentPill({
  index,
  from = index,
  animate,
}: {
  index: number;
  from?: number;
  animate: boolean;
}) {
  const position: CSSProperties = { '--segment-index': index, '--segment-from': from };

  return (
    <span
      aria-hidden
      style={position}
      className={cn(
        'bg-secondary-container absolute inset-0 -z-10 [grid-area:1/1/2/2] translate-x-[calc(var(--segment-index)*(100%+0.125rem))] rounded-full starting:translate-x-[calc(var(--segment-from)*(100%+0.125rem))]',
        animate && 'ease-spatial-fast transition-transform duration-350',
      )}
    />
  );
}

// Locale and theme in one compact row at the foot of the profile panel.
function SiteControls({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const theme = useThemePreference();
  const { section } = useSectionNavigation();
  // The stored theme arrives after hydration; only a click slides its pill.
  const [themePicked, setThemePicked] = useState(false);

  useEffect(() => {
    leftLocale = null;
  }, []);

  return (
    <div className='border-outline-variant flex flex-wrap items-center justify-between gap-2 border-t pt-4'>
      <nav aria-label={t.localeLabel} className={segmentGroup}>
        <SegmentPill
          index={locales.indexOf(locale)}
          from={locales.indexOf(leftLocale ?? locale)}
          animate
        />
        {locales.map((target) => (
          <Button key={target} asChild variant='segment' size='sm'>
            <Link
              to={localePath(target)}
              // The open Section comes along to the other Locale. Not `hash: true`:
              // that reads the address while hydrating, and React keeps the
              // prerendered href when it differs, which has no hash.
              hash={sectionHash(section)}
              resetScroll={false}
              hashScrollIntoView={false}
              activeOptions={{ exact: true }}
              hrefLang={target}
              lang={target}
              aria-current={target === locale ? 'page' : undefined}
              onClick={() => {
                leftLocale = locale;
                rememberLocale(target);
              }}
            >
              {localeNames[target]}
            </Link>
          </Button>
        ))}
      </nav>

      <fieldset aria-label={t.themeLabel} className={segmentGroup}>
        <SegmentPill index={themeOrder.indexOf(theme)} animate={themePicked} />
        {themeOrder.map((option) => {
          const Icon = themeIcons[option];

          return (
            <Button
              key={option}
              variant='segment'
              size='icon-sm'
              aria-label={t.themes[option]}
              title={t.themes[option]}
              aria-pressed={theme === option}
              onClick={(event) => {
                setThemePicked(true);
                void revealTheme(option, event.currentTarget);
              }}
            >
              <Icon aria-hidden />
            </Button>
          );
        })}
      </fieldset>
    </div>
  );
}

export { SiteControls };
