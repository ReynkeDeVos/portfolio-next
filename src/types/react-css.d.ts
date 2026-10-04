import 'react';

declare module 'react' {
  // Lets style objects set CSS custom properties without asserting the whole
  // object to CSSProperties, so standard properties stay type-checked. Module
  // augmentation needs an interface, so it extends rather than declares members.
  // oxlint-disable-next-line typescript/no-empty-interface
  interface CSSProperties extends Partial<Record<`--${string}`, number | string>> {}
}
