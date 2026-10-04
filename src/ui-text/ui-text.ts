import type { Locale } from '../lib/locale.ts';

type Years = Readonly<{ from: number; to: number | null }>;

type CurrentRole = Readonly<{ role: string; organization: string; since: number }>;

// Each Locale's name in its own language, the same on every page.
const localeNames = { en: 'English', de: 'Deutsch' } satisfies Record<Locale, string>;

// "2014–2023", "2024", or "2025–present": an open end reads as the present.
function years({ from, to }: Years, present: string) {
  return to === from ? String(from) : `${from}–${to ?? present}`;
}

const en = {
  localeLabel: 'Language',
  themeLabel: 'Color theme',
  themes: { system: 'System theme', light: 'Light theme', dark: 'Dark theme' },
  contactLabel: 'Contact',
  photoOpen: 'View larger portrait',
  photoHint: 'click me 😊',
  photoClose: 'Close photo',
  photoLoading: 'Loading the photo',
  email: 'Email',
  copyAddress: 'Copy email address',
  addressCopied: 'Email address copied',
  addressShown: (address: string) => `Email address: ${address}`,
  copyFailed: 'Couldn’t copy the email address; it’s now shown below the contact buttons.',
  strengthsLabel: 'Profile highlights',
  currentRole: ({ role, organization, since }: CurrentRole): readonly [string, string] => [
    role,
    ` at ${organization}, since ${since}`,
  ],
  period: (span: Years) => years(span, 'present'),
  sectionsLabel: 'Portfolio sections',
  toolbarLabel: 'Jump to a section',
  sectionNames: { work: 'Work', skills: 'Skills', workflow: 'Workflow', career: 'Career' },
  sectionHeadings: {
    work: 'Selected work',
    skills: 'Skills',
    workflow: 'Workflow and interests',
    career: 'Career',
  },
  sourceOnGitHub: 'source on GitHub',
  underTheHood: 'Under the hood',
  opensInNewTab: 'opens in a new tab',
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
    title: (name: string) => `Page not found · ${name}`,
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
    description:
      'Renke Brixel builds web applications, game mods and tools for the terminal and Linux desktop. Selected projects, skills and experience.',
  },
};

// Every Locale repeats the English keys, with the same value types.
const uiText = {
  en,
  de: {
    localeLabel: 'Sprache',
    themeLabel: 'Farbschema',
    themes: { system: 'System-Farbschema', light: 'Helles Farbschema', dark: 'Dunkles Farbschema' },
    contactLabel: 'Kontakt',
    photoOpen: 'Porträt vergrößern',
    photoHint: 'klick mich 😊',
    photoClose: 'Foto schließen',
    photoLoading: 'Foto wird geladen',
    email: 'E-Mail',
    copyAddress: 'E-Mail-Adresse kopieren',
    addressCopied: 'E-Mail-Adresse kopiert',
    addressShown: (address: string) => `E-Mail-Adresse: ${address}`,
    copyFailed:
      'Die E-Mail-Adresse ließ sich nicht kopieren; sie steht jetzt unter den Kontaktbuttons.',
    strengthsLabel: 'Kurzprofil',
    currentRole: ({ role, organization, since }: CurrentRole): readonly [string, string] => [
      role,
      ` bei ${organization}, seit ${since}`,
    ],
    period: (span: Years) => years(span, 'heute'),
    sectionsLabel: 'Bereiche des Portfolios',
    toolbarLabel: 'Zu einem Bereich springen',
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
    underTheHood: 'Technisch',
    opensInNewTab: 'öffnet in neuem Tab',
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
      title: (name: string) => `Seite nicht gefunden · ${name}`,
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
      description:
        'Renke Brixel entwickelt Webanwendungen, Spiele-Mods und Werkzeuge für Terminal und Linux-Desktop. Ausgewählte Projekte, Kenntnisse und Berufserfahrung.',
    },
  },
} satisfies Record<Locale, typeof en>;

export { localeNames, uiText };
