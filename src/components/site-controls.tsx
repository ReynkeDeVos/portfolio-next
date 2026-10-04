import { Link } from '@tanstack/react-router';
import { Monitor, Moon, Sun } from 'lucide-react';

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

// Locale and theme in one compact row at the foot of the profile panel.
function SiteControls({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const theme = useThemePreference();
  const { section } = useSectionNavigation();

  return (
    <div className='border-outline-variant flex flex-wrap items-center justify-between gap-2 border-t pt-4'>
      <nav
        aria-label={t.localeLabel}
        className='bg-surface-container-high flex items-center gap-0.5 rounded-full p-1'
      >
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
                rememberLocale(target);
              }}
            >
              {localeNames[target]}
            </Link>
          </Button>
        ))}
      </nav>

      <fieldset
        aria-label={t.themeLabel}
        className='bg-surface-container-high flex items-center gap-0.5 rounded-full p-1'
      >
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
