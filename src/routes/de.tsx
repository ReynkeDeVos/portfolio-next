import { createFileRoute } from '@tanstack/react-router';

import { PortfolioPage } from '@/components/portfolio-page';
import { pageHead } from '@/head/head';

const Route = createFileRoute('/de')({
  head: () => pageHead('de'),
  component: German,
});

function German() {
  return <PortfolioPage locale='de' />;
}

export { Route };
