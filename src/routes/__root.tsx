import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';

const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Renke Brixel | Software Developer' },
      {
        name: 'description',
        content:
          'Explore Renke Brixel’s software projects and technical skills across frontend, backend and algorithms.',
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export { Route };
