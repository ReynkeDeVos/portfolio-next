import 'react';

declare module 'react' {
  // Lets style objects set CSS custom properties without asserting the whole
  // object to CSSProperties, so standard properties stay type-checked.
  interface CSSProperties extends Partial<Record<`--${string}`, number | string>> {}
}
