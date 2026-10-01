type Locale = 'en' | 'de';

const sections = ['work', 'career', 'skills', 'workflow'] as const;

type Section = (typeof sections)[number];

function isSection(value: string): value is Section {
  return sections.some((section) => section === value);
}

const localePaths = { en: '/', de: '/de' } as const;

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
  strengthsLabel: 'Profile highlights',
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
  aiHeading: 'AI starting points',
  aiColumns: { task: 'Task', model: 'Model', effort: 'Thinking level' },
  updated: 'Updated',
  buildHeading: 'How this portfolio is built',
  experienceHeading: 'Experience',
  teachingHeading: 'Topics I teach',
  present: 'present',
  meta: {
    title: 'Renke Brixel | Software Developer in Hamburg',
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
    strengthsLabel: 'Kurzprofil',
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
    aiHeading: 'KI-Ausgangspunkte',
    aiColumns: { task: 'Aufgabe', model: 'Modell', effort: 'Denkstufe' },
    updated: 'Stand',
    buildHeading: 'So ist dieses Portfolio gebaut',
    experienceHeading: 'Berufserfahrung',
    teachingHeading: 'Themen, die ich unterrichte',
    present: 'heute',
    meta: {
      title: 'Renke Brixel | Softwareentwickler in Hamburg',
      description:
        'Renke Brixel entwickelt Webanwendungen, Spiele-Mods und Werkzeuge für Terminal und Linux-Desktop. Ausgewählte Projekte, Kenntnisse und Werdegang.',
      ogLocale: 'de_DE',
    },
  },
} satisfies Record<Locale, typeof en>;

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
      { rel: 'alternate', hrefLang: 'en', href: localePaths.en },
      { rel: 'alternate', hrefLang: 'de', href: localePaths.de },
      { rel: 'alternate', hrefLang: 'x-default', href: localePaths.en },
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
  isSection,
  localeFromPathname,
  localePaths,
  pageHead,
  sections,
};

export type { Locale, Section };
