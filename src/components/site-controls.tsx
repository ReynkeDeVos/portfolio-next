import { Link } from '@tanstack/react-router';
import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { copy } from '@/copy/copy';
import { localePath, locales, rememberLocale } from '@/lib/locale';
import type { Locale } from '@/lib/locale';
import { sectionHash } from '@/lib/section';
import type { Section } from '@/lib/section';
import { setTheme, useThemePreference } from '@/lib/theme';
import type { ThemePreference } from '@/lib/theme';

const themeIcons = { system: Monitor, light: Sun, dark: Moon } as const;

const themeOrder: ThemePreference[] = ['system', 'light', 'dark'];

// Locale and theme in one compact row at the foot of the profile panel.
function SiteControls({ locale, section }: { locale: Locale; section: Section }) {
  const t = copy[locale];
  const theme = useThemePreference();
  // Preserve the open Section across Locales.
  const hash = sectionHash(section);

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
              hash={hash}
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
              {t.localeNames[target]}
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
              onClick={() => {
                setTheme(option);
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
