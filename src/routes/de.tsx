import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/components/copy';
import { PortfolioPage } from '@/components/portfolio-page';

const Route = createFileRoute('/de')({
  head: () => pageHead('de'),
  component: German,
});

function German() {
  return <PortfolioPage locale='de' />;
}

export { Route };
