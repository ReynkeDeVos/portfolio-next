import { Link, useRouterState } from '@tanstack/react-router';

import { copy, localeFromPathname } from './copy';
import { NotFoundAnimation } from './not-found-animation';
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
        <div className='mb-4'>
          <NotFoundAnimation />
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
