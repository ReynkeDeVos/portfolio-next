import assert from 'node:assert/strict';
import { test } from 'node:test';

import { startViewTransition } from './view-transition.ts';
import type { ViewTransitionOptions } from './view-transition.ts';

// A stand-in document that records how it was asked to transition. Like the
// real one, it fails when its method is called without it.
class TransitionDocument {
  calls: ViewTransitionOptions[] = [];

  readonly acceptsOptions: boolean;

  constructor(acceptsOptions: boolean) {
    this.acceptsOptions = acceptsOptions;
  }

  startViewTransition(options: ViewTransitionOptions) {
    if ('update' in options && !this.acceptsOptions) {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.calls.push(options);
  }
}

const types = ['morph', 'morph-open'];

function update() {
  // The change itself does not matter here, only how it is handed over.
}

await test('without view transitions the change still happens', () => {
  let updates = 0;

  startViewTransition(
    () => {
      updates += 1;
    },
    types,
    {},
  );

  assert.equal(updates, 1);
});

await test('a supporting browser runs the change in a typed transition', () => {
  const target = new TransitionDocument(true);

  startViewTransition(update, types, target);

  assert.deepEqual(target.calls, [{ update, types }]);
});

await test('a browser without transition types falls back to the callback form', () => {
  const target = new TransitionDocument(false);

  startViewTransition(update, types, target);

  assert.deepEqual(target.calls, [update]);
});
