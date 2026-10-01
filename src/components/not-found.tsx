import { Link, useRouterState } from '@tanstack/react-router';

import { copy, localeFromPathname } from './copy';
import { Button } from './ui/button';

function NotFound() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPathname(pathname);
  const t = copy[locale].notFound;

  return (
    <>
      <title>{`${t.title} · Renke Brixel`}</title>
      <meta name='robots' content='noindex' />
      <main className='mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 py-10 text-center'>
        <div aria-hidden className='mb-4 grid justify-items-center'>
          <svg viewBox='0 0 160 140' className='not-found-ghost h-32 w-36 overflow-visible'>
            <path d='M36 64a44 44 0 0 1 88 0v42a8.8 8.8 0 0 1-17.6 0v-1a8.8 8.8 0 0 0-17.6 0v1a8.8 8.8 0 0 1-17.6 0v-1a8.8 8.8 0 0 0-17.6 0v1a8.8 8.8 0 0 1-17.6 0Z' />
            <g className='not-found-ghost-eyes'>
              <circle cx='62' cy='66' r='5.5' />
              <circle cx='98' cy='66' r='5.5' />
            </g>
          </svg>
          <span className='not-found-ghost-shadow bg-primary h-2 w-16' />
        </div>
        <h1 className='type-headline-md text-on-surface'>{t.heading}</h1>
        <p className='type-body-lg text-on-surface-variant max-w-[30ch]'>{t.description}</p>
        <Button asChild className='mt-2'>
          <Link to={locale === 'de' ? '/de' : '/'}>{t.back}</Link>
        </Button>
      </main>
    </>
  );
}

export { NotFound };
