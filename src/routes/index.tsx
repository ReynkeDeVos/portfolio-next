import { createFileRoute } from '@tanstack/react-router';

const Route = createFileRoute('/')({ component: Foundation });

function Foundation() {
  return null;
}

export { Route };
