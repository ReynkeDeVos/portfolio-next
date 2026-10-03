# Coding standards

Judgement calls for review. Mechanical rules live in `.oxlintrc.json` (lint) and `.oxfmtrc.jsonc` (format); don't restate them here.

## Glossary names

- Identifiers, comments and docs use the `GLOSSARY.md` terms: Locale, Content, Copy, Section, Project, Selected work, Current role, Engine note. Flag the synonyms it lists under _Avoid_ (e.g. a Content type named `Portfolio`, `lang`, `tab`).
- Capitalise the terms in prose and comments: "each Locale", "the Current role".
- The terms are for code, not visitors. Visible text in Copy and Content keeps natural wording; a rename once turned the German "Dieses Portfolio" into "Dieses Content".

## Copy vs Content

- Copy (`src/copy/copy.ts`): the page's own words and sentence templates, one object per Locale with the same keys as `en`.
- Content (`src/content/`): facts about the owner, bilingual `{ en, de }` in `portfolio.ts`, shape declared once in `schema.ts`.
- Content hands over structured facts (years, a role object, the owner's name); Copy templates turn them into sentences. Words such as "present"/"heute" are Copy, not Content.
- Formatting follows the words: `contentFor` does word-free Locale formatting (Intl dates, translated technology names); Copy does any formatting that needs words (periods ending in "present"/"heute", the Current role sentence, page titles around the owner's name).
- Views get Content from `contentFor(locale)`, already localized and formatted. They don't index raw Content with `[locale]` or format dates, periods or technology names themselves.
- Locale facts (which Locales exist, paths, Intl and Open Graph tags) live in `src/lib/locale.ts`, Section facts in `src/lib/section.ts`. Don't restate them in components.

## Page head

- `src/head/head.ts` owns every head tag: the document tags, each Locale page's title, description, Open Graph and `localeHead` links, and the not-found title. Routes and the not-found page take their tags from it.
- It sits above `src/lib/`, Content and Copy because it composes all three; lint keeps that order one-way (lib, then Content and Copy, then head, then the views).

## Imports that Node loads

- `node --test` and `content:check` run TypeScript in plain Node, which resolves neither `@/` nor extensionless paths. So `src/content/**`, `src/copy/**`, `src/head/**`, `src/lib/locale.ts` and anything they import use relative paths with `.ts` (`'../lib/locale.ts'`).
- Vite-only code (views, routes, `src/lib/console-greeting.ts`) uses `@/`.

## Comments and tests

- Comments explain why: a constraint, a guard, a browser quirk. Don't narrate what the code does.
- Tests use `node:test` and small fixtures (`src/content/test-fixtures.ts`). Only guards that must hold for the owner's data (valid Content, Selected work order) read the real Content.
