import { runInNewContext } from 'node:vm';

type StandInStorage = { getItem: (key: string) => string | null };

// The parts of a browser the head scripts read. `stored` fills localStorage
// unless a test passes its own.
type StandInBrowser = {
  stored?: Record<string, string>;
  localStorage?: StandInStorage;
  location?: { pathname?: string; search?: string; hash?: string; replace?: (url: string) => void };
  navigator?: { userAgentData?: { brands: { brand: string }[] } };
};

// Runs a head script against a stand-in browser and returns the root element,
// so a test can see what the script marked.
function runHeadScript(
  script: string,
  { stored = {}, localStorage, location, navigator }: StandInBrowser = {},
) {
  const dataset: Record<string, string> = {};
  const documentElement = { hidden: false, dataset };

  runInNewContext(script, {
    localStorage: localStorage ?? {
      getItem: (key: string) => (Object.hasOwn(stored, key) ? stored[key] : null),
    },
    document: { documentElement },
    location,
    navigator,
  });

  return documentElement;
}

// Storage that throws, as with cookies blocked.
const blockedStorage: StandInStorage = {
  getItem() {
    throw new Error('Storage is blocked');
  },
};

export { blockedStorage, runHeadScript };
