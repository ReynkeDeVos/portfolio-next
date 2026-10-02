type Locale = 'en' | 'de';

const sections = ['work', 'career', 'skills', 'workflow'] as const;

type Section = (typeof sections)[number];

function isSection(value: string): value is Section {
  return sections.some((section) => section === value);
}

const localePaths = { en: '/', de: '/de' } as const;

const siteOrigin = 'https://portfolio.renkebrixel.workers.dev';

const en = {
  languageLabel: 'Language',
  languageNames: { en: 'English', de: 'Deutsch' },
  themeLabel: 'Color theme',
  themes: { system: 'System theme', light: 'Light theme', dark: 'Dark theme' },
  contactLabel: 'Contact',
  photoOpen: 'View larger portrait',
  photoHint: { action: 'click me 😊' },
  photoTitle: 'Portrait of Renke Brixel',
  photoClose: 'Close photo',
  email: 'Email',
  copyAddress: 'Copy email address',
  addressCopied: 'Email address copied',
  strengthsLabel: 'Profile highlights',
  technologyNames: { Networking: 'Networking', 'Matt Pocock skills': 'Matt Pocock skills' },
  currentRole: (role: string, organization: string, since: string): readonly [string, string] => [
    role,
    ` at ${organization}, since ${since}`,
  ],
  sectionsLabel: 'Portfolio sections',
  sectionNames: { work: 'Work', skills: 'Skills', workflow: 'Workflow', career: 'Career' },
  sectionHeadings: {
    work: 'Selected work',
    skills: 'Skills',
    workflow: 'Workflow and interests',
    career: 'Career',
  },
  sourceOnGitHub: 'source on GitHub',
  moreWork: 'More projects',
  moreOnGitHub: 'See more on my GitHub profile',
  moreOnLinkedIn: 'See more on my LinkedIn profile',
  aiHeading: 'My AI workflow',
  aiTable: { task: 'Task', model: 'Model' },
  toolsHeading: 'Tools around the models',
  thinkingLevel: 'Thinking level',
  updated: 'Updated',
  buildHeading: 'How this portfolio is built',
  notFound: {
    title: 'Page not found',
    heading: 'Whoops!',
    description: 'I couldn’t find the page you were looking for.',
    back: 'Back to portfolio',
  },
  teachingHeading: 'Topics I teach',
  engineNote: {
    title: 'Built for Chromium, on purpose',
    lead: 'This portfolio is my playground for the newest web features, and some of them have so far only landed in Blink, the engine behind Chrome. Your browser uses a different engine, so a few details may look off.',
    why: 'Why only Chromium?',
    details: [
      'Trying out the latest features is the only reason. Making the site look just as good in Gecko (Firefox) or WebKit (Safari) would be no problem; it simply was not the goal of this project.',
      'To see the page as intended, open it in Chrome, Edge, Brave, Opera or another Chromium-based browser. On iPhone and iPad, all browsers run on WebKit (thanks Apple), so a notebook or Android device works best. Or give your browser a year or two to catch up, and the glitches should disappear on their own.',
    ],
    dismiss: 'Hide this note',
  },
  present: 'present',
  meta: {
    title: 'Renke Brixel · Dev',
    description:
      'Renke Brixel builds web applications, game mods and tools for the terminal and Linux desktop. Selected projects, skills and experience.',
    ogLocale: 'en_US',
  },
};

// Every locale repeats the English keys, with the same value types.
const copy = {
  en,
  de: {
    languageLabel: 'Sprache',
    languageNames: { en: 'English', de: 'Deutsch' },
    themeLabel: 'Farbschema',
    themes: { system: 'Systemeinstellung', light: 'Helles Farbschema', dark: 'Dunkles Farbschema' },
    contactLabel: 'Kontakt',
    photoOpen: 'Porträt vergrößern',
    photoHint: { action: 'klick mich 😊' },
    photoTitle: 'Porträt von Renke Brixel',
    photoClose: 'Foto schließen',
    email: 'E-Mail',
    copyAddress: 'E-Mail-Adresse kopieren',
    addressCopied: 'E-Mail-Adresse kopiert',
    strengthsLabel: 'Kurzprofil',
    technologyNames: { Networking: 'Netzwerke', 'Matt Pocock skills': 'Matt Pococks Skills' },
    currentRole: (role: string, organization: string, since: string): readonly [string, string] => [
      role,
      ` bei ${organization}, seit ${since}`,
    ],
    sectionsLabel: 'Bereiche des Portfolios',
    sectionNames: {
      work: 'Projekte',
      skills: 'Kenntnisse',
      workflow: 'Workflow',
      career: 'Werdegang',
    },
    sectionHeadings: {
      work: 'Ausgewählte Projekte',
      skills: 'Kenntnisse',
      workflow: 'Arbeitsweise und Interessen',
      career: 'Werdegang',
    },
    sourceOnGitHub: 'Quellcode auf GitHub',
    moreWork: 'Weitere Projekte',
    moreOnGitHub: 'Mehr auf meinem GitHub-Profil',
    moreOnLinkedIn: 'Mehr auf meinem LinkedIn-Profil',
    aiHeading: 'Mein KI-Workflow',
    aiTable: { task: 'Aufgabe', model: 'Modell' },
    toolsHeading: 'Werkzeuge rund um die Modelle',
    thinkingLevel: 'Denkstufe',
    updated: 'Stand',
    buildHeading: 'So ist dieses Portfolio gebaut',
    notFound: {
      title: 'Seite nicht gefunden',
      heading: 'Huch!',
      description: 'Ich konnte die Seite, nach der du gesucht hast, nicht finden.',
      back: 'Zurück zum Portfolio',
    },
    teachingHeading: 'Themen, die ich unterrichte',
    engineNote: {
      title: 'Bewusst für Chromium gebaut',
      lead: 'Dieses Portfolio ist meine Spielwiese für die neuesten Web-Features, und einige davon gibt es bisher nur in Blink, der Engine hinter Chrome. Dein Browser nutzt eine andere Engine, daher können einzelne Details hier fehlerhaft aussehen.',
      why: 'Warum nur Chromium?',
      details: [
        'Die neuesten Features auszuprobieren ist der einzige Grund. Die Seite genauso gut für Gecko (Firefox) oder WebKit (Safari) umzusetzen, wäre kein Problem; es war nur nicht das Ziel dieses Projekts.',
        'Wenn du die Seite wie gedacht sehen möchtest, öffne sie in Chrome, Edge, Brave, Opera oder einem anderen Chromium-basierten Browser. Auf iPhone und iPad laufen alle Browser mit WebKit (danke, Apple), daher eignet sich ein Notebook oder Android-Gerät am besten. Oder gib deinem Browser ein, zwei Jahre Zeit, dann sollten die Fehler von selbst verschwinden.',
      ],
      dismiss: 'Hinweis ausblenden',
    },
    present: 'heute',
    meta: {
      title: 'Renke Brixel · Dev',
      description:
        'Renke Brixel entwickelt Webanwendungen, Spiele-Mods und Werkzeuge für Terminal und Linux-Desktop. Ausgewählte Projekte, Kenntnisse und Berufserfahrung.',
      ogLocale: 'de_DE',
    },
  },
} satisfies Record<Locale, typeof en>;

// Product and library names stay unchanged; generic labels follow the locale.
function formatTechnology(name: string, locale: Locale) {
  return Object.entries(copy[locale].technologyNames).find(([key]) => key === name)?.[1] ?? name;
}

// "2025-present" -> "2025–present", localized.
function formatPeriod(period: string, locale: Locale) {
  return period.replace('present', copy[locale].present).replace('-', '–');
}

function formatDate(isoDate: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

function pageHead(locale: Locale) {
  const { meta } = copy[locale];

  return {
    meta: [
      { title: meta.title },
      { name: 'description', content: meta.description },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: meta.ogLocale },
    ],
    links: [
      { rel: 'alternate', hrefLang: 'en', href: new URL(localePaths.en, siteOrigin).href },
      { rel: 'alternate', hrefLang: 'de', href: new URL(localePaths.de, siteOrigin).href },
      { rel: 'alternate', hrefLang: 'x-default', href: new URL(localePaths.en, siteOrigin).href },
    ],
  };
}

function localeFromPathname(pathname: string): Locale {
  return pathname === '/de' || pathname.startsWith('/de/') ? 'de' : 'en';
}

export {
  copy,
  formatDate,
  formatPeriod,
  formatTechnology,
  isSection,
  localeFromPathname,
  pageHead,
  sections,
};

export type { Locale, Section };
