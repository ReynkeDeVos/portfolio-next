import { Link, useRouterState } from '@tanstack/react-router';

import catStill from '@/assets/not-found-cat-still.avif';
import cat from '@/assets/not-found-cat.avif';
import { notFoundHead } from '@/head/head';
import type { Locale } from '@/lib/locale';
import { localeFromPathname, localePath } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import { Button } from './ui/button';

function NotFound() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPathname(pathname);
  const t = uiText[locale].notFound;

  return (
    <main className='mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 py-10 text-center'>
      {/* The cat is decorative and only ships with this page. Reduced motion
            shows its first frame as a still. */}
      <picture className='mb-4'>
        <source media='(prefers-reduced-motion: reduce)' srcSet={catStill} />
        <img src={cat} alt='' width={224} height={213} />
      </picture>
      <h1 className='type-headline-md text-on-surface'>{t.heading}</h1>
      <p className='type-body-lg text-on-surface-variant max-w-[30ch]'>{t.description}</p>
      <Button asChild className='mt-2'>
        <Link to={localePath(locale)}>{t.back}</Link>
      </Button>
    </main>
  );
}

// The page's tags, for the root to place in the head: it has no route head,
// and Redact, unlike React, leaves tags where they render.
function NotFoundHead({ locale }: { locale: Locale }) {
  const { title, robots } = notFoundHead(locale);

  return (
    <>
      <title>{title}</title>
      <meta name='robots' content={robots} />
    </>
  );
}

export { NotFound, NotFoundHead };
