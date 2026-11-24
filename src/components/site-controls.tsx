import { Link } from '@tanstack/react-router';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

import { SegmentedGroup, SegmentedOption } from '@/components/ui/segmented-control';
import { localePath, locales, rememberLocale } from '@/lib/locale';
import type { Locale } from '@/lib/locale';
import { sectionHash } from '@/lib/section';
import { revealTheme, themeGroupSlot, themeOrder, useThemePreference } from '@/lib/theme';
import { localeNames, uiText } from '@/ui-text/ui-text';

import { useSectionNavigation } from './section-navigation';

const themeIcons = { system: Monitor, light: Sun, dark: Moon } as const;

// Each Locale has its own page, so a Locale link remounts these controls. The
// Locale the visitor just left lets the new page's pill start where the old
// one stood; the new page clears it, so Back and Forward simply appear.
let leftLocale: Locale | null = null;

// Locale and theme in one compact row at the foot of the profile panel.
function SiteControls({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const theme = useThemePreference();
  const { section } = useSectionNavigation();

  useEffect(() => {
    leftLocale = null;
  }, []);

  return (
    <div className='border-outline-variant flex flex-wrap items-center justify-between gap-2 border-t pt-4'>
      {/* On touch screens the Locales take the room the 48px theme
          segments leave, so both groups still share one row on phones. */}
      <SegmentedGroup
        as='nav'
        label={t.localeLabel}
        index={locales.indexOf(locale)}
        from={locales.indexOf(leftLocale ?? locale)}
        className='pointer-coarse:grow'
      >
        {locales.map((target) => (
          <SegmentedOption key={target} asChild>
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
          </SegmentedOption>
        ))}
      </SegmentedGroup>

      {/* themeStyles in the document head moves this pill before hydration. */}
      <SegmentedGroup
        as='fieldset'
        label={t.themeLabel}
        slot={themeGroupSlot}
        index={themeOrder.indexOf(theme)}
      >
        {themeOrder.map((option) => {
          const Icon = themeIcons[option];

          return (
            <SegmentedOption
              key={option}
              icon
              label={t.themes[option]}
              title={t.themes[option]}
              pressed={theme === option}
              themeOption={option}
              onClick={(event) => {
                void revealTheme(option, event.currentTarget);
              }}
            >
              <Icon aria-hidden />
            </SegmentedOption>
          );
        })}
      </SegmentedGroup>
    </div>
  );
}

export { SiteControls };
