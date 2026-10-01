type Locale = 'en' | 'de';

const sections = ['work', 'career', 'skills', 'workflow'] as const;
type Section = (typeof sections)[number];

function isSection(value: string): value is Section {
  return (sections as readonly string[]).includes(value);
}

const localePaths = { en: '/', de: '/de' } as const;

const copy = {
  en: {
    languageLabel: 'Language',
    languageNames: { en: 'English', de: 'Deutsch' },
    themeLabel: 'Color theme',
    themes: { system: 'System theme', light: 'Light theme', dark: 'Dark theme' },
    contactLabel: 'Contact',
    photoOpen: 'View larger portrait',
    photoTitle: 'Portrait of Renke Brixel',
    photoClose: 'Close photo',
    email: 'Email',
    strengthsLabel: 'Core strengths',
    currentRole: (role: string, organization: string, since: string) =>
      [role, ` at ${organization}, since ${since}`] as const,
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
    aiHeading: 'AI starting points',
    aiColumns: { task: 'Task', model: 'Model', effort: 'Thinking level' },
    updated: 'Updated',
    buildHeading: 'How this portfolio is built',
    experienceHeading: 'Experience',
    teachingHeading: 'Current teaching',
    teachingNote: 'Topics I teach, listed separately from my project experience.',
    present: 'present',
    meta: {
      title: 'Renke Brixel | Software Developer in Hamburg',
      description:
        'Renke Brixel builds web applications, game mods and tools for the terminal and Linux desktop. Selected projects, skills and experience.',
      ogLocale: 'en_US',
    },
  },
  de: {
    languageLabel: 'Sprache',
    languageNames: { en: 'English', de: 'Deutsch' },
    themeLabel: 'Farbschema',
    themes: { system: 'Systemeinstellung', light: 'Helles Farbschema', dark: 'Dunkles Farbschema' },
    contactLabel: 'Kontakt',
    photoOpen: 'Porträt vergrößern',
    photoTitle: 'Porträt von Renke Brixel',
    photoClose: 'Foto schließen',
    email: 'E-Mail',
    strengthsLabel: 'Kernkompetenzen',
    currentRole: (role: string, organization: string, since: string) =>
      [role, ` bei ${organization}, seit ${since}`] as const,
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
    aiHeading: 'KI-Ausgangspunkte',
    aiColumns: { task: 'Aufgabe', model: 'Modell', effort: 'Denkstufe' },
    updated: 'Stand',
    buildHeading: 'So ist dieses Portfolio gebaut',
    experienceHeading: 'Berufserfahrung',
    teachingHeading: 'Aktuelle Lehrthemen',
    teachingNote: 'Themen, die ich unterrichte, getrennt von meiner Projekterfahrung aufgeführt.',
    present: 'heute',
    meta: {
      title: 'Renke Brixel | Softwareentwickler in Hamburg',
      description:
        'Renke Brixel entwickelt Webanwendungen, Spiele-Mods und Werkzeuge für Terminal und Linux-Desktop. Ausgewählte Projekte, Kenntnisse und Werdegang.',
      ogLocale: 'de_DE',
    },
  },
} satisfies Record<Locale, unknown>;

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
