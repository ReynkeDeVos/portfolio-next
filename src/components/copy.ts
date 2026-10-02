import { localeHead } from '../lib/locale.ts';
import type { Locale } from '../lib/locale.ts';

type Years = Readonly<{ from: number; to: number | null }>;

type CurrentRole = Readonly<{ role: string; organization: string; since: number }>;

// "2014–2023", "2024", or "2025–present": an open end reads as the present.
function years({ from, to }: Years, present: string) {
  return to === from ? String(from) : `${from}–${to ?? present}`;
}

const en = {
  languageLabel: 'Language',
  languageNames: { en: 'English', de: 'Deutsch' },
  themeLabel: 'Color theme',
  themes: { system: 'System theme', light: 'Light theme', dark: 'Dark theme' },
  contactLabel: 'Contact',
  photoOpen: 'View larger portrait',
  photoHint: { action: 'click me 😊' },
  photoClose: 'Close photo',
  email: 'Email',
  copyAddress: 'Copy email address',
  addressCopied: 'Email address copied',
  strengthsLabel: 'Profile highlights',
  currentRole: ({ role, organization, since }: CurrentRole): readonly [string, string] => [
    role,
    ` at ${organization}, since ${since}`,
  ],
  period: (span: Years) => years(span, 'present'),
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
    lead: 'Do a few animations look a little… wonky? Don’t worry, that’s just the browser. I’m trying out the latest web features, and your browser hasn’t caught up with all of them yet.',
    why: 'Why only Chromium?',
    details: [
      'This portfolio is my playground for the latest web features. Some are only available in Blink, the engine behind Chrome. Your browser uses a different engine. I could make it look just as good in Firefox (Gecko) and Safari (WebKit); here, though, I want to experiment with the newest browser features.',
      'Open the page in Chrome, Edge, Brave, Opera or another Chromium-based browser on a laptop or Android device. On iPhone and iPad, there’s always WebKit under the hood. Thanks, Apple. 🤷',
      'Or give your browser a year or two. By then, it will support these new features too.',
    ],
    dismiss: 'Hide this note',
  },
  meta: {
    title: 'Renke Brixel · Dev',
    description:
      'Renke Brixel builds web applications, game mods and tools for the terminal and Linux desktop. Selected projects, skills and experience.',
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
    photoClose: 'Foto schließen',
    email: 'E-Mail',
    copyAddress: 'E-Mail-Adresse kopieren',
    addressCopied: 'E-Mail-Adresse kopiert',
    strengthsLabel: 'Kurzprofil',
    currentRole: ({ role, organization, since }: CurrentRole): readonly [string, string] => [
      role,
      ` bei ${organization}, seit ${since}`,
    ],
    period: (span: Years) => years(span, 'heute'),
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
      lead: 'Sehen ein paar Animationen etwas … verunglückt aus? Keine Sorge, das ist nur der Browser. Ich probiere hier die neuesten Web-Features aus, und ein paar davon kennt er noch nicht.',
      why: 'Warum nur Chromium?',
      details: [
        'Dieses Portfolio ist meine Spielwiese für die neuesten Web-Features. Einige gibt es bisher nur in Blink, der Engine hinter Chrome. Dein Browser nutzt eine andere Engine. Ich könnte die Seite auch für Firefox (Gecko) und Safari (WebKit) genauso hübsch machen; hier möchte ich aber mit den neuesten Browser-Features experimentieren.',
        'Öffne die Seite in Chrome, Edge, Brave, Opera oder einem anderen Chromium-basierten Browser auf einem Notebook oder Android-Gerät. Auf iPhone und iPad läuft aber immer WebKit. Danke, Apple. 🤷',
        'Oder gib deinem Browser ein, zwei Jahre Zeit. Dann unterstützt er diese neuen Features auch.',
      ],
      dismiss: 'Hinweis ausblenden',
    },
    meta: {
      title: 'Renke Brixel · Dev',
      description:
        'Renke Brixel entwickelt Webanwendungen, Spiele-Mods und Werkzeuge für Terminal und Linux-Desktop. Ausgewählte Projekte, Kenntnisse und Berufserfahrung.',
    },
  },
} satisfies Record<Locale, typeof en>;

function pageHead(locale: Locale) {
  const { meta } = copy[locale];
  const head = localeHead(locale);

  return {
    meta: [
      { title: meta.title },
      { name: 'description', content: meta.description },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      ...head.meta,
    ],
    links: head.links,
  };
}

export { copy, pageHead };
