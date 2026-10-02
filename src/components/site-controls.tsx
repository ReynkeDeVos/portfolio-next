import { Link } from '@tanstack/react-router';
import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { rememberLocale } from '@/lib/locale';
import { setTheme, useThemePreference } from '@/lib/theme';
import type { ThemePreference } from '@/lib/theme';

import { copy } from './copy';
import type { Locale, Section } from './copy';

const themeIcons = { system: Monitor, light: Sun, dark: Moon } as const;

const themeOrder: ThemePreference[] = ['system', 'light', 'dark'];

// Language and theme in one compact row at the foot of the profile panel.
function SiteControls({ locale, section }: { locale: Locale; section: Section }) {
  const t = copy[locale];
  const theme = useThemePreference();
  // Preserve the open section across languages; the default needs no hash.
  const hash = section === 'work' ? undefined : section;

  return (
    <div className='border-outline-variant flex flex-wrap items-center justify-between gap-2 border-t pt-4'>
      <nav
        aria-label={t.languageLabel}
        className='bg-surface-container-high flex items-center gap-0.5 rounded-full p-1'
      >
        {(['en', 'de'] as const).map((target) => (
          <Button key={target} asChild variant='segment' size='sm'>
            <Link
              to={target === 'de' ? '/de' : '/'}
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
              {t.languageNames[target]}
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
