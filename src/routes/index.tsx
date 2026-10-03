import { createFileRoute } from '@tanstack/react-router';

import { PortfolioPage } from '@/components/portfolio-page';
import { pageHead } from '@/head/head';

const Route = createFileRoute('/')({
  head: () => pageHead('en'),
  component: English,
});

function English() {
  return <PortfolioPage locale='en' />;
}

export { Route };
