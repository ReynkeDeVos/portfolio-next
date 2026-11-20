// Bilingual content data grows with the portfolio, not with logic.
// oxlint-disable max-lines

import type { Content } from './schema.ts';

export const portfolio = {
  name: 'Renke Brixel',
  location: {
    en: 'Hamburg, Germany',
    de: 'Hamburg, Deutschland',
  },
  emailEncoded: 'cmVua2UuYnJpeGVsK3BvcnRmb2xpb0BnbWFpbC5jb20=',
  github: 'https://github.com/ReynkeDeVos',
  linkedin: 'https://www.linkedin.com/in/rbrixel/',
  portrait: {
    src: '/images/renke-portrait.avif',
    alt: { en: 'Portrait of Renke Brixel', de: 'Porträt von Renke Brixel' },
    width: 480,
    height: 480,
  },
  fullPortrait: {
    src: '/images/renke-full-portrait.avif',
    alt: {
      en: 'Renke Brixel standing with a laptop',
      de: 'Renke Brixel steht mit einem Laptop',
    },
    width: 720,
    height: 1080,
  },
  identity: {
    en: 'I build software and teach people to code.',
    de: 'Ich entwickle Software & unterrichte Programmieren.',
  },
  introduction: {
    en: 'I love learning new things, coding, coffee, long runs, and making friends with cats & dogs.',
    de: 'Ich liebe Lernen, Programmieren, Kaffee, lange Läufe und Freundschaft mit Katzen & Hunden.',
  },
  interests: [],
  coreStrengths: [
    { id: 'react-typescript', name: { en: 'React & TypeScript', de: 'React & TypeScript' } },
    { id: 'dotnet', name: { en: 'C#/.NET', de: 'C#/.NET' } },
    { id: 'python', name: { en: 'Python', de: 'Python' } },
    { id: 'linux', name: { en: 'Linux & terminal tools', de: 'Linux & Terminal-Werkzeuge' } },
    { id: 'ultrarunning', name: { en: 'Ultrarunning', de: 'Ultralaufen' } },
  ],
  // Product and library names stay unchanged; only generic labels translate.
  technologyNames: {
    Networking: { en: 'Networking', de: 'Netzwerke' },
    'Matt Pocock skills': { en: 'Matt Pocock skills', de: 'Matt Pococks Skills' },
  },
  skills: [
    {
      id: 'languages',
      title: { en: 'Languages & foundations', de: 'Sprachen & Grundlagen' },
      technologies: [
        'TypeScript',
        'JavaScript',
        'C#',
        'Python',
        'Rust',
        'SQL',
        'HTML',
        'CSS',
        'zsh',
      ],
      description: {
        en: 'TypeScript in the browser and on Node.js, C# on .NET, Python for algorithms and TUIs, Rust for small native tools.',
        de: 'TypeScript im Browser und auf Node.js, C# auf .NET, Python für Algorithmen und TUIs, Rust für kleine native Tools.',
      },
    },
    {
      id: 'ai-tools',
      title: { en: 'AI-assisted engineering & SDKs', de: 'KI-gestützte Entwicklung & SDKs' },
      technologies: [
        'Claude Code',
        'Codex',
        'T3 Code',
        'pi',
        'OpenSpec',
        'Matt Pocock skills',
        'open-code-review',
        'MCP',
        'Claude Agent SDK',
        'Anthropic SDK',
        'OpenAI Agents SDK',
        'OpenAI SDK',
        'Google Gen AI SDK',
        'Ollama',
        'n8n',
      ],
      description: {
        en: 'Spec-driven coding, cross-model reviews and agent harnesses daily; streaming, tool calls, MCP and local models in teaching.',
        de: 'Spec-getriebene Entwicklung, Cross-Model-Reviews und Agent-Harnesses im Alltag; Streaming, Tool-Calls, MCP und lokale Modelle im Unterricht.',
      },
    },
    {
      id: 'web',
      title: { en: 'Web interfaces', de: 'Weboberflächen' },
      technologies: [
        'React',
        'Next.js',
        'TanStack Start',
        'React Router',
        'TanStack Query',
        'Vite',
        'Tailwind CSS',
        'shadcn/ui',
        'Zod',
        'Effect',
      ],
      description: {
        en: 'Prerendered and interactive apps with strong typing, accessible primitives and predictable state.',
        de: 'Vorgerenderte und interaktive Web-Apps mit strenger Typisierung, barrierefreien Bausteinen und klarem State.',
      },
    },
    {
      id: 'backend',
      title: { en: 'APIs & data', de: 'APIs & Daten' },
      technologies: [
        'ASP.NET Core',
        'Entity Framework Core',
        'Node.js',
        'Express',
        'Flask',
        'SQL Server',
        'PostgreSQL',
        'MongoDB',
        'Mongoose',
        'SQLite',
        'REST',
        'OpenAPI',
        'Better Auth',
      ],
      description: {
        en: 'REST APIs, relational and document storage, and auth from custom JWT/cookies to ASP.NET Core Identity and Better Auth.',
        de: 'REST-APIs, relationale und dokumentenbasierte Datenbanken sowie Auth von eigenen JWT/Cookies bis ASP.NET Core Identity und Better Auth.',
      },
    },
    {
      id: 'quality',
      title: { en: 'Quality & delivery', de: 'Qualität & Bereitstellung' },
      technologies: [
        'Vitest',
        'Testing Library',
        'Playwright',
        'GitHub Actions',
        'Docker',
        'Podman',
        'Cloudflare',
        'Azure',
        'Git',
        'Oxc',
        'Fallow',
      ],
      description: {
        en: 'Automated tests, fast Rust-based linting and container or edge deploys from a terminal-first Linux setup.',
        de: 'Automatisierte Tests, schnelles Rust-Linting sowie Container- und Edge-Deployments aus einem terminalbasierten Linux-Setup.',
      },
    },
  ],
  aiRecommendations: {
    updated: '2026-11-20',
    tiers: [
      {
        id: 'small',
        label: { en: 'Small', de: 'Klein' },
        tagline: {
          en: 'Ship before the coffee cools',
          de: 'Fertig, bevor der Kaffee kalt ist',
        },
        stages: [
          {
            id: 'plan',
            title: { en: 'Plan & spec', de: 'Planung & Spec' },
            status: { en: 'Skip', de: 'Überspringen' },
            summary: {
              en: 'No spec ceremony when the scope fits in one sentence.',
              de: 'Keine Spec-Bürokratie, wenn der Umfang in einen Satz passt.',
            },
            emphasis: 'quiet',
          },
          {
            id: 'build',
            title: { en: 'Build & verify', de: 'Bauen & prüfen' },
            status: { en: 'Direct edit', de: 'Direkte Umsetzung' },
            summary: {
              en: 'Implement cleanly and run lint, typecheck and tests right away.',
              de: 'Sauber umsetzen und direkt Lint, Typecheck und Tests laufen lassen.',
            },
            emphasis: 'primary',
          },
          {
            id: 'review',
            title: { en: 'Review gate', de: 'Review-Gate' },
            status: { en: 'Self-check', de: 'Selbstcheck' },
            summary: {
              en: 'Read the diff carefully; no separate reviewer council needed.',
              de: 'Diff aufmerksam lesen; kein eigenes Review-Council nötig.',
            },
            emphasis: 'quiet',
          },
          {
            id: 'ship',
            title: { en: 'Ship', de: 'Ausliefern' },
            status: { en: 'Merge', de: 'Mergen' },
            summary: {
              en: 'Small, reversible commit lands once checks are green.',
              de: 'Kleiner, leicht umkehrbarer Commit landet bei grünen Checks.',
            },
            emphasis: 'primary',
          },
        ],
        links: [{ name: 'rstack', url: 'https://github.com/ReynkeDeVos/rstack' }],
      },
      {
        id: 'medium',
        label: { en: 'Medium', de: 'Mittel' },
        tagline: {
          en: 'Trust, then cross-check',
          de: 'Vertrauen ist gut, Cross-Check ist besser',
        },
        stages: [
          {
            id: 'plan',
            title: { en: 'Plan & spec', de: 'Planung & Spec' },
            status: { en: 'Short plan', de: 'Kurzer Plan' },
            summary: {
              en: 'Pin down boundaries, edge cases and what stays out of scope.',
              de: 'Grenzen, Randfälle und bewusste Ausnahmen kurz festziehen.',
            },
            emphasis: 'primary',
          },
          {
            id: 'build',
            title: { en: 'Build & verify', de: 'Bauen & prüfen' },
            status: { en: 'Worktree & tests', de: 'Worktree & Tests' },
            summary: {
              en: 'Build in a fresh Git worktree and prove the diff with automated checks.',
              de: 'In einem frischen Git-Worktree umsetzen und mit Tests absichern.',
            },
            emphasis: 'primary',
          },
          {
            id: 'review',
            title: { en: 'Review gate', de: 'Review-Gate' },
            status: { en: 'Reviewer council', de: 'Review-Council' },
            summary: {
              en: 'Independent models from another family review the diff for blind spots.',
              de: 'Modelle einer anderen Familie prüfen den Diff auf blinde Flecken.',
            },
            emphasis: 'review',
          },
          {
            id: 'ship',
            title: { en: 'Ship', de: 'Ausliefern' },
            status: { en: 'Confidence gate', de: 'Vertrauens-Gate' },
            summary: {
              en: 'Merge once author and reviewer council both report high confidence.',
              de: 'Merge erst, wenn Umsetzung und Council gemeinsam grünes Licht geben.',
            },
            emphasis: 'primary',
          },
        ],
        links: [
          { name: 'code-review', url: 'https://www.aihero.dev/skills-code-review' },
          { name: 'rstack', url: 'https://github.com/ReynkeDeVos/rstack' },
        ],
      },
      {
        id: 'high',
        label: { en: 'High risk', de: 'Hohes Risiko' },
        tagline: {
          en: 'Measure twice, review thrice',
          de: 'Zweimal planen, dreimal prüfen',
        },
        stages: [
          {
            id: 'plan',
            title: { en: 'Plan & spec', de: 'Planung & Spec' },
            status: { en: 'Spec-driven', de: 'Spec-getrieben' },
            summary: {
              en: 'Map open decisions first with OpenSpec, wayfinder or grill-with-docs.',
              de: 'Offene Fragen zuerst mit OpenSpec, wayfinder oder grill-with-docs klären.',
            },
            emphasis: 'review',
          },
          {
            id: 'build',
            title: { en: 'Build & verify', de: 'Bauen & prüfen' },
            status: { en: 'Worktree & suite', de: 'Worktree & Suite' },
            summary: {
              en: 'Build slice by slice in an isolated worktree with unit and browser tests.',
              de: 'Schrittweise im isolierten Worktree bauen, mit Unit- und Browser-Tests.',
            },
            emphasis: 'primary',
          },
          {
            id: 'review',
            title: { en: 'Review gate', de: 'Review-Gate' },
            status: { en: 'Council + OCR', de: 'Council + OCR' },
            summary: {
              en: 'Cross-family reviewer council plus alibaba/open-code-review line audits.',
              de: 'Cross-Model-Council plus alibaba/open-code-review für Zeilen-Audits.',
            },
            emphasis: 'review',
          },
          {
            id: 'ship',
            title: { en: 'Ship', de: 'Ausliefern' },
            status: { en: 'Verified merge', de: 'Verifizierter Merge' },
            summary: {
              en: 'Security, data and concurrency findings resolved and re-verified first.',
              de: 'Funde zu Sicherheit, Daten und Nebenläufigkeit vor dem Merge klären.',
            },
            emphasis: 'primary',
          },
        ],
        links: [
          { name: 'OpenSpec', url: 'https://openspec.dev/' },
          { name: 'wayfinder', url: 'https://www.aihero.dev/skills-wayfinder' },
          { name: 'grill-with-docs', url: 'https://www.aihero.dev/skills-grill-with-docs' },
          { name: 'open-code-review', url: 'https://github.com/alibaba/open-code-review' },
        ],
      },
    ],
    items: [
      {
        id: 'investigate',
        task: { en: 'Investigate & debug', de: 'Untersuchen & debuggen' },
        model: 'Opus 5.5',
        effort: 'High',
        note: {
          en: 'Root causes, regressions, repros and architecture',
          de: 'Fehlerursachen, Regressionen, Reproduktionen und Architektur',
        },
      },
      {
        id: 'build',
        task: { en: 'Build & implement', de: 'Entwickeln & umsetzen' },
        model: 'Gemini 4 Neon',
        effort: 'Extra High',
        note: {
          en: 'Features, refactors, migrations, long ports and performance work',
          de: 'Features, Refactorings, Migrationen, langwierige Portierungen und Performance-Arbeit',
        },
      },
      {
        id: 'write',
        task: { en: 'Write for people', de: 'Für Menschen schreiben' },
        model: 'Gemini 4 Neon',
        effort: 'High',
        note: {
          en: 'Plans, proposals and feature write-ups a person will read',
          de: 'Pläne, Vorschläge und Feature-Beschreibungen, die Menschen lesen',
        },
      },
      {
        id: 'review',
        task: { en: 'Review code', de: 'Code prüfen' },
        model: 'GPT-6.2 Astra',
        effort: 'High',
        note: {
          en: 'Independent cross-family review',
          de: 'Unabhängige Prüfung durch eine andere Modellfamilie',
        },
      },
      {
        id: 'design',
        task: { en: 'Explore visual design', de: 'Visuelles Design erkunden' },
        model: 'Fable 5.2',
        effort: 'High',
        note: {
          en: 'Fresh visual directions, graphics and unique visualizers',
          de: 'Neue visuelle Richtungen, Grafiken und eigenständige Visualisierungen',
        },
      },
      {
        id: 'advise',
        task: { en: 'Get unstuck', de: 'Blockaden lösen' },
        model: 'Fable 5.2',
        effort: 'High',
        note: {
          en: 'Stuck runs, calls no check can settle, and whether circling work is good enough to ship',
          de: 'Festgefahrene Läufe, Fragen ohne prüfbare Antwort und ob kreisende Arbeit gut genug zum Ausliefern ist',
        },
      },
      {
        id: 'bulk',
        task: { en: 'Bulk analysis', de: 'Massenanalyse' },
        model: 'Haiku 5.5',
        effort: 'Medium',
        note: {
          en: 'Classify or pattern-match across many files or a large data set',
          de: 'Viele Dateien oder große Datenmengen klassifizieren oder nach Mustern durchsuchen',
        },
      },
    ],
    modelNotes: [
      {
        model: 'Gemini 4 Neon',
        note: {
          en: 'High for small, clear edits; check its claims about a codebase; weak at 3D visuals; falls back to Opus when unavailable.',
          de: 'High für kleine, klar umrissene Änderungen; Aussagen über eine Codebasis prüfen; schwach bei 3D-Grafik; fällt auf Opus zurück, wenn nicht verfügbar.',
        },
      },
      {
        model: 'Opus 5.5',
        note: {
          en: 'Builds when Neon is unavailable; Extra High when investigating hairy work that needs many checks; no Low or Max.',
          de: 'Setzt um, wenn Neon nicht verfügbar ist; Extra High bei kniffligen Untersuchungen mit vielen Prüfungen; kein Low und kein Max.',
        },
      },
      {
        model: 'Fable 5.2',
        note: {
          en: 'Finds the fix or direction and directs while Neon implements; its own changes must pass their checks; Extra High only for the hardest problems; no Max.',
          de: 'Findet die Lösung oder Richtung und gibt sie vor, Neon setzt um; eigene Änderungen müssen ihre Prüfungen bestehen; Extra High nur für die schwersten Probleme; kein Max.',
        },
      },
      {
        model: 'GPT-6.2 Astra',
        note: {
          en: 'Only for review and heavy computer use; ask for plain-English findings and have Opus restate a report you cannot follow.',
          de: 'Nur für Reviews und anspruchsvolle Computer-Nutzung; Befunde in klarer Sprache anfordern und unverständliche Berichte von Opus umformulieren lassen.',
        },
      },
      {
        model: 'Haiku 5.5',
        note: {
          en: 'Reasoning on; reads and labels, never writes code.',
          de: 'Mit Reasoning; liest und ordnet zu, schreibt nie Code.',
        },
      },
    ],
    tips: [
      {
        id: 'harness',
        title: { en: 'Orchestration', de: 'Orchestrierung' },
        description: {
          en: 'Parallel sessions in T3 Code, custom harnesses in pi and remote reach via Tailscale.',
          de: 'Parallele Sessions in T3 Code, eigene Harnesses in pi und Remote-Zugriff über Tailscale.',
        },
        links: [
          { name: 'T3 Code', url: 'https://t3.codes/' },
          { name: 'pi', url: 'https://pi.dev/' },
          { name: 'Tailscale', url: 'https://tailscale.com/' },
          { name: 'Grok Bot', url: 'https://x.ai/bot' },
        ],
      },
      {
        id: 'planning',
        title: { en: 'Planning & specs', de: 'Planung & Specs' },
        description: {
          en: 'Pinning down open decisions and versioned specs before writing code.',
          de: 'Offene Entscheidungen und versionierte Specs vor dem ersten Commit.',
        },
        links: [
          { name: 'wayfinder', url: 'https://www.aihero.dev/skills-wayfinder' },
          { name: 'grill-with-docs', url: 'https://www.aihero.dev/skills-grill-with-docs' },
          { name: 'OpenSpec', url: 'https://openspec.dev/' },
        ],
      },
      {
        id: 'engineering-skills',
        title: { en: 'Review & quality', de: 'Review & Qualität' },
        description: {
          en: 'Cross-model PR checks, line-level risk audits and my shared rstack rules.',
          de: 'Cross-Model-Reviews, Risiko-Audits auf Zeilenebene und meine rstack-Regeln.',
        },
        links: [
          { name: 'open-code-review', url: 'https://github.com/alibaba/open-code-review' },
          { name: 'code-review', url: 'https://www.aihero.dev/skills-code-review' },
          { name: 'ponytail', url: 'https://ponytail.dev/' },
          { name: 'rstack', url: 'https://github.com/ReynkeDeVos/rstack' },
        ],
      },
      {
        id: 'design',
        title: { en: 'Design', de: 'Design' },
        description: {
          en: 'Interface craft, UX critique and purposeful motion.',
          de: 'Oberflächendesign, UX-Kritik und gezielte Bewegung.',
        },
        links: [{ name: 'Impeccable', url: 'https://impeccable.style/' }],
      },
      {
        id: 'environment',
        title: { en: 'Terminal & Arch Linux', de: 'Terminal & Arch Linux' },
        description: {
          en: '20+ years on Linux (yes, Arch btw). Text config lets coding agents customize the OS itself, and fast local filesystems keep parallel Git worktrees painless.',
          de: 'Über 20 Jahre Linux (ja, Arch btw). Klartext-Konfiguration lässt Agenten am System mitarbeiten, und schnelle Dateisysteme halten parallele Git-Worktrees flott.',
        },
        links: [
          { name: 'Arch Linux', url: 'https://archlinux.org/' },
          { name: 'Omarchy', url: 'https://omarchy.org/' },
        ],
      },
    ],
  },
  portfolioBuild: {
    items: [
      {
        id: 'rendering',
        topic: { en: 'Framework', de: 'Framework' },
        technologies: ['React 19', 'TanStack Redact', 'TanStack Start', 'Vite 8'],
        description: {
          en: 'Both locales prerender to static HTML. Components run on TanStack Redact for a smaller client runtime, and tab switches make zero network requests.',
          de: 'Beide Sprachfassungen werden vorab als statisches HTML gerendert. TanStack Redact hält die Laufzeit schlank, und Tabwechsel brauchen keine Netzwerkanfrage.',
        },
      },
      {
        id: 'interface',
        topic: { en: 'Components', de: 'Komponenten' },
        technologies: ['shadcn/ui', 'Tailwind CSS 4', 'cn', '@shadcn/lint', 'Lucide'],
        description: {
          en: 'Components live directly in the repo instead of behind a black box. cn replaces clsx + tailwind-merge, and @shadcn/lint catches raw colors and off-token values.',
          de: 'Komponenten liegen direkt im Repository statt in einer Blackbox. cn ersetzt clsx + tailwind-merge, und @shadcn/lint meldet feste Farben oder Werte außerhalb der Tokens.',
        },
      },
      {
        id: 'content',
        topic: { en: 'Content', de: 'Inhalte' },
        technologies: ['Zod 4'],
        description: {
          en: 'Checks English and German content in CI for missing translations, empty strings, broken relationships and invalid URLs.',
          de: 'Prüft englische und deutsche Inhalte in der CI auf fehlende Übersetzungen, leere Texte, fehlerhafte Referenzen und ungültige URLs.',
        },
      },
      {
        id: 'packages',
        topic: { en: 'Runtime & packages', de: 'Laufzeit & Pakete' },
        technologies: ['mise', 'Node.js', 'aube'],
        description: {
          en: 'mise pins Node LTS locally; aube reads pnpm-lock.yaml directly and checks release age, provenance and known malicious packages before resolving versions.',
          de: 'mise fixiert Node LTS lokal; aube liest pnpm-lock.yaml direkt und prüft Release-Alter, Herkunftsnachweise und bekannte Schadpakete vor der Auflösung.',
        },
      },
      {
        id: 'tooling',
        topic: { en: 'Code quality', de: 'Codequalität' },
        technologies: ['TypeScript 7', 'Oxlint', 'Oxfmt', 'Fallow'],
        description: {
          en: 'TypeScript 7’s Go compiler powers type-aware Oxlint checks (including anti-slop rules). Oxfmt formats, and Fallow flags dead code, unused exports and duplicates.',
          de: 'Der Go-Compiler von TypeScript 7 treibt typbasierte Oxlint-Prüfungen samt Anti-Slop-Regeln an. Oxfmt formatiert, Fallow findet toten Code und ungenutzte Exporte.',
        },
      },
      {
        id: 'images',
        topic: { en: 'Design & assets', de: 'Design & Assets' },
        technologies: ['Material 3 Expressive', 'Fontsource', 'AVIF'],
        description: {
          en: 'Material 3 Expressive surfaces with self-hosted Fontsource variable fonts instanced to the exact Latin weights used, plus metadata-free AVIF portraits.',
          de: 'Material 3 Expressive mit selbst gehosteten Fontsource-Schriften, zugeschnitten auf die genutzten lateinischen Schriftschnitte, plus AVIF-Porträts ohne Metadaten.',
        },
      },
      {
        id: 'testing',
        topic: { en: 'Test pipeline', de: 'Testpipeline' },
        technologies: ['GitHub Actions', 'Playwright'],
        description: {
          en: 'Unit tests, content validation, lint and typechecks run in a companion test repo on GitHub Actions, followed by Playwright checks for tabs, history, portrait morphs and keyboard focus.',
          de: 'Unit-Tests, Inhaltsprüfung, Lint und Typechecks laufen per GitHub Actions im privaten Test-Repo, gefolgt von Playwright-Checks für Tabs, Verlauf, Porträt-Morph und Tastaturfokus.',
        },
      },
      {
        id: 'hosting',
        topic: { en: 'Deployment', de: 'Deployment' },
        technologies: ['Cloudflare Workers', 'Wrangler'],
        description: {
          en: 'Deployed straight from main to Cloudflare Workers, TanStack Start’s official hosting partner.',
          de: 'Direkt von main auf Cloudflare Workers bereitgestellt, dem offiziellen Hosting-Partner von TanStack Start.',
        },
      },
    ],
    links: [
      { name: 'React 19', url: 'https://react.dev/' },
      { name: 'TanStack Redact', url: 'https://github.com/TanStack/redact' },
      { name: 'TanStack Start', url: 'https://tanstack.com/start' },
      { name: 'Vite 8', url: 'https://vite.dev/' },
      { name: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
      { name: 'Tailwind CSS 4', url: 'https://tailwindcss.com/' },
      { name: 'cn', url: 'https://github.com/shadcn-ui/cn' },
      { name: '@shadcn/lint', url: 'https://github.com/shadcn-ui/lint' },
      { name: 'Lucide', url: 'https://lucide.dev/' },
      { name: 'Zod 4', url: 'https://zod.dev/' },
      { name: 'mise', url: 'https://mise.jdx.dev/' },
      { name: 'Node.js', url: 'https://nodejs.org/' },
      { name: 'aube', url: 'https://aube.sh/' },
      { name: 'TypeScript 7', url: 'https://www.typescriptlang.org/' },
      { name: 'Oxlint', url: 'https://oxc.rs/' },
      { name: 'Oxfmt', url: 'https://oxc.rs/' },
      { name: 'Fallow', url: 'https://fallow.tools/' },
      { name: 'Material 3 Expressive', url: 'https://m3.material.io/' },
      { name: 'AVIF', url: 'https://aomediacodec.github.io/av1-avif/' },
      { name: 'Fontsource', url: 'https://fontsource.org/' },
      { name: 'GitHub Actions', url: 'https://github.com/features/actions' },
      { name: 'Playwright', url: 'https://playwright.dev/' },
      { name: 'Cloudflare Workers', url: 'https://www.cloudflare.com/products/workers/' },
      { name: 'Wrangler', url: 'https://github.com/cloudflare/workers-sdk' },
    ],
  },
  teaching: [
    {
      id: 'web',
      topic: { en: 'Web foundations', de: 'Web-Grundlagen' },
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'Git', 'GitHub'],
    },
    {
      id: 'frontend',
      topic: { en: 'Frontend development', de: 'Frontend-Entwicklung' },
      technologies: ['React', 'TypeScript', 'Vite'],
    },
    {
      id: 'react-frameworks',
      topic: { en: 'React frameworks & data', de: 'React-Frameworks & Daten' },
      technologies: ['Next.js', 'React Router', 'TanStack Query', 'Zod'],
    },
    {
      id: 'node-apis',
      topic: {
        en: 'Node APIs in JavaScript & TypeScript',
        de: 'Node-APIs mit JavaScript & TypeScript',
      },
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Zod', 'Swagger'],
    },
    {
      id: 'authentication',
      topic: { en: 'Authentication', de: 'Authentifizierung' },
      technologies: ['JWT', 'Cookies', 'bcrypt', 'ASP.NET Core Identity', 'Better Auth'],
    },
    {
      id: 'csharp',
      topic: { en: 'C# & .NET', de: 'C# & .NET' },
      technologies: ['C#', '.NET', 'LINQ'],
    },
    {
      id: 'dotnet-apis',
      topic: { en: '.NET APIs & persistence', de: '.NET-APIs & Persistenz' },
      technologies: [
        'ASP.NET Core',
        'Entity Framework Core',
        'SQL Server',
        'SQLite',
        'Scalar',
        'Serilog',
      ],
    },
    {
      id: 'algorithms',
      topic: { en: 'Algorithms & data structures', de: 'Algorithmen & Datenstrukturen' },
      technologies: ['Python'],
    },
    {
      id: 'python-web',
      topic: { en: 'Python web & SQL', de: 'Python-Webentwicklung & SQL' },
      technologies: ['Flask', 'PostgreSQL'],
    },
    {
      id: 'computer-science',
      topic: { en: 'Computer science & terminal', de: 'Informatik & Terminal' },
      technologies: ['Networking', 'HTTP', 'Bash', 'zsh'],
    },
    {
      id: 'testing',
      topic: { en: 'Testing & delivery', de: 'Tests & Bereitstellung' },
      technologies: ['Vitest', 'Testing Library', 'GitHub Actions', 'Docker Compose', 'Azure'],
    },
    {
      id: 'ai-integration',
      topic: { en: 'AI integration', de: 'KI-Integration' },
      technologies: [
        'OpenAI SDK',
        'Anthropic SDK',
        'Google Gen AI SDK',
        'OpenAI Agents SDK',
        'Claude Agent SDK',
        'MCP',
        'Ollama',
      ],
    },
    {
      id: 'ai-coding',
      topic: {
        en: 'AI-assisted coding & automation',
        de: 'KI-gestütztes Programmieren & Automatisierung',
      },
      technologies: ['GitHub Copilot', 'OpenSpec', 'Matt Pocock skills', 'n8n'],
    },
  ],
  experience: [
    {
      id: 'wbs',
      organization: { en: 'WBS Coding School', de: 'WBS Coding School' },
      url: 'https://www.wbscodingschool.com/',
      period: { from: 2025, to: null },
      role: { en: 'Software development instructor', de: 'Dozent für Softwareentwicklung' },
      description: {
        en: 'Teaching full-stack web development (React, TypeScript, Node.js), C#/.NET backends, Python algorithms and AI agent workflows across both tracks. Completed the Claude Code for Business course as part of our partner-program preparation.',
        de: 'Ich unterrichte Full-Stack-Webentwicklung (React, TypeScript, Node.js), C#/.NET-Backends, Python-Algorithmen und KI-Agenten-Workflows in beiden Tracks. Außerdem habe ich den Kurs Claude Code for Business zur Vorbereitung auf das Partnerprogramm absolviert.',
      },
    },
    {
      id: 'closelink',
      organization: { en: 'Closelink', de: 'Closelink' },
      url: 'https://www.closelink.com/',
      period: { from: 2024, to: 2024 },
      role: { en: 'Frontend development intern', de: 'Praktikant Frontend-Entwicklung' },
      description: {
        en: 'Modernized UI components in React, TypeScript and Formik alongside engineering and design to streamline B2B workflows.',
        de: 'UI-Komponenten in React, TypeScript und Formik modernisiert und gemeinsam mit Entwicklung und Design die B2B-Workflows verschlankt.',
      },
    },
    {
      id: 'leibniz-virology',
      organization: { en: 'Leibniz Institute for Virology', de: 'Leibniz-Institut für Virologie' },
      url: 'https://www.leibniz-liv.de/en/research/research-units/virus-host-interaction',
      period: { from: 2014, to: 2023 },
      role: { en: 'Biological-technical assistant', de: 'Biologisch-technischer Assistent' },
      description: {
        en: 'Researched how common viruses hijack human cells. As hazardous materials officer, I rolled out lab software, trained the team and helped run cross-disciplinary lab operations.',
        de: 'Erforscht, wie verbreitete Viren menschliche Zellen kapern. Als Gefahrstoffbeauftragter habe ich Labor-Software eingeführt, das Team geschult und den Laborbetrieb mitorganisiert.',
      },
    },
    {
      id: 'uke',
      organization: {
        en: 'University Medical Center Hamburg-Eppendorf',
        de: 'Universitätsklinikum Hamburg-Eppendorf',
      },
      url: 'https://www.uke.de/kliniken-institute/institute/institut-f%C3%BCr-tumorbiologie/index.html',
      period: { from: 2012, to: 2014 },
      role: { en: 'Biological-technical assistant', de: 'Biologisch-technischer Assistent' },
      description: {
        en: 'Studied what drives breast cancer metastasis, analyzed samples, maintained the lab database and mentored incoming interns.',
        de: 'Untersucht, was die Ausbreitung von Brustkrebszellen auslöst, Proben ausgewertet, die Datenbank gepflegt und Praktikanten betreut.',
      },
    },
    {
      id: 'utah',
      organization: {
        en: 'University of Utah School of Medicine',
        de: 'University of Utah School of Medicine',
      },
      url: 'https://medicine.utah.edu/',
      period: { from: 2012, to: 2012 },
      role: { en: 'Research intern', de: 'Forschungspraktikant' },
      description: {
        en: 'Reprogrammed patient skin cells into neurons to model brain-injury risk during heart transplants, maintained the plasmid database and built a phone/desktop to-do app for the lab on software it already licensed.',
        de: 'Patienten-Hautzellen zu Nervenzellen umprogrammiert, um Hirnschaden-Risiken bei Herztransplantationen zu modellieren, die Plasmid-Datenbank gepflegt und auf Basis bestehender Lizenzen eine Team-To-do-App für Smartphone und Desktop gebaut.',
      },
    },
  ],
  // Display order is set here, not by catalog order. Catalog records that are
  // not listed stay in the catalog without being shown.
  selectedWork: {
    featured: ['project-formatter', 'flights', 'reputation-assistant'],
    supporting: ['omarchy-stats', 'rstack', 'scoundrel-tui', 'portfolio'],
  },
  projects: [
    {
      id: 'project-formatter',
      name: 'Project Formatter',
      category: { en: 'VS Code extension', de: 'VS-Code-Erweiterung' },
      description: {
        en: 'One default formatter for VS Code that automatically picks whatever a repo uses (Prettier, Biome, Oxfmt, dprint or Bun) and falls back to Oxfmt.',
        de: 'Ein Standard-Formatter für VS Code, der automatisch das Werkzeug des jeweiligen Repos nutzt (Prettier, Biome, Oxfmt, dprint oder Bun) und sonst auf Oxfmt zurückfällt.',
      },
      technologies: ['JavaScript', 'Node.js', 'VS Code API', 'Oxfmt'],
      url: 'https://github.com/ReynkeDeVos/vscode-project-formatter',
      details: {
        en: 'Shipped as a VSIX release for Linux and macOS.',
        de: 'Als VSIX-Release für Linux und macOS veröffentlicht.',
      },
      engineering: {
        en: 'Walks up to the repository root to detect scripts, configs or dependencies. Keeps a project’s Prettier warm in a worker, runs Biome and dprint natively, formats Python (Ruff) and C# (CSharpier) code blocks inside Markdown using the active formatter’s own parser, and kills leftover processes on cancelled saves or a 15s timeout.',
        de: 'Sucht bis ins Repo-Root nach Skripten, Konfigurationen oder Abhängigkeiten. Hält das Projekt-Prettier im Worker warm, startet Biome und dprint nativ, formatiert Python- (Ruff) und C#-Blöcke (CSharpier) in Markdown über den eigenen Parser des aktiven Formatters und beendet Prozesse bei Abbruch oder nach 15 s.',
      },
    },
    {
      id: 'flights',
      name: 'Flights',
      category: { en: 'Linux desktop widget', de: 'Linux-Desktop-Widget' },
      description: {
        en: 'Built to track my partner’s long-haul trips right in my desktop bar: live delays, tight transfers, gate changes and when to leave for airport pickup.',
        de: 'Gebaut, um die Langstreckenflüge meiner Partnerin direkt in der Desktop-Leiste zu verfolgen: Verspätungen, knappe Umstiege, Gate-Wechsel und Abfahrtszeit zum Flughafen.',
      },
      technologies: ['Rust', 'QML', 'Quickshell', 'Linux'],
      url: 'https://github.com/ReynkeDeVos/omarchy-plugin-flights',
      details: {
        en: 'Includes an interactive demo recorded from real Lufthansa flights.',
        de: 'Mit einer interaktiven Demo auf Basis echter Lufthansa-Flüge.',
      },
      engineering: {
        en: 'A 2.2 MB size-optimized Rust backend (ureq and jiff) polls FlightStats and adsb.lol without API keys and feeds a Quickshell/QML widget with milestone notifications, full keyboard setup and color-coded status icons.',
        de: 'Ein 2,2 MB kleines, größenoptimiertes Rust-Backend (ureq und jiff) liest FlightStats und adsb.lol ohne API-Keys aus und speist ein Quickshell/QML-Widget mit Meilenstein-Meldungen, Tastaturbedienung und farbcodierten Status-Icons.',
      },
    },
    {
      id: 'reputation-assistant',
      name: 'Reputation Assistant',
      category: {
        en: 'Caves of Qud mod · Steam Workshop',
        de: 'Caves-of-Qud-Mod · Steam Workshop',
      },
      description: {
        en: 'Shows which factions care about a character and what a kill or Water Ritual will cost before you act.',
        de: 'Zeigt vor einer Entscheidung, welche Fraktionen zu einer Figur gehören und was es kostet, sie zu töten oder ein Wasserritual durchzuführen.',
      },
      technologies: ['C#', 'Harmony'],
      url: 'https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant',
      details: {
        en: 'Default faction priorities follow qudzoo’s guide and stay customizable in-game.',
        de: 'Die Standard-Prioritäten folgen dem Leitfaden von qudzoo und lassen sich im Spiel anpassen.',
      },
      engineering: {
        en: 'Patches the game’s C# assemblies at runtime via Harmony to inject faction priorities, targets and worst-roll outcomes directly into creature tooltips. Safe to toggle mid-save and maintained through major game updates (mod v1.7).',
        de: 'Patcht die C#-Assemblies des Spiels zur Laufzeit per Harmony und blendet Fraktionsprioritäten, Zielwerte und Worst-Case-Folgen direkt im Tooltip ein. Sicher mitten im Spielstand nutzbar und nach großen Spiel-Updates weitergepflegt (Mod v1.7).',
      },
    },
    {
      id: 'omarchy-stats',
      name: 'System Stats',
      category: { en: 'Linux desktop widget', de: 'Linux-Desktop-Widget' },
      description: {
        en: 'Live CPU, RAM and GPU load on every monitor, backed by one shared native C sampler.',
        de: 'Live-Auslastung von CPU, RAM und GPU auf jedem Monitor, gespeist von einem gemeinsamen nativen C-Sampler.',
      },
      technologies: ['C', 'QML', 'Quickshell', 'Linux'],
      url: 'https://github.com/ReynkeDeVos/omarchy-plugin-system-stats',
      details: {
        en: 'Reads /proc, Intel PMU/DRM fdinfo and AMD sysfs directly with crash-backoff restarts.',
        de: 'Liest /proc, Intel-PMU/DRM-fdinfo und AMD-sysfs direkt aus, mit Neustart-Backoff.',
      },
    },
    {
      id: 'rstack',
      name: 'rstack',
      category: { en: 'AI coding setup', de: 'KI-Entwicklungs-Setup' },
      description: {
        en: 'My shared skills, model routing rules and cross-model PR review gate for Claude Code, Codex and T3 Code in one public repo.',
        de: 'Meine gemeinsamen Skills, das Modell-Routing und das Cross-Model-PR-Review-Gate für Claude Code, Codex und T3 Code in einem öffentlichen Repo.',
      },
      technologies: ['Claude Code', 'Codex', 'Markdown', 'JavaScript'],
      url: 'https://github.com/ReynkeDeVos/rstack',
      details: {
        en: 'Includes timestamped model evaluations and a web-modernization audit skill.',
        de: 'Mit datierten Modell-Bewertungen und einem Web-Modernisierungs-Skill.',
      },
    },
    {
      id: 'scoundrel-tui',
      name: 'Scoundrel TUI',
      category: { en: 'Terminal card game', de: 'Terminal-Kartenspiel' },
      description: {
        en: 'Keyboard-driven roguelike card game in the terminal, rendering illustrated cards over the Kitty graphics protocol or half-block fallback.',
        de: 'Tastaturgesteuertes Roguelike-Kartenspiel fürs Terminal mit illustrierten Karten über das Kitty-Grafikprotokoll oder Halbblock-Fallback.',
      },
      technologies: ['Python', 'Textual'],
      url: 'https://github.com/ReynkeDeVos/Scoundrel-TUI',
      details: {
        en: 'Based on Scoundrel by Zach Gage and Kurt Bieg.',
        de: 'Nach dem Kartenspiel Scoundrel von Zach Gage und Kurt Bieg.',
      },
      engineering: {
        en: 'Built on Python and Textual with pluggable terminal image rendering (Kitty graphics protocol and half-block characters).',
        de: 'Mit Python und Textual gebaut, mit umschaltbarem Terminal-Rendering (Kitty-Grafikprotokoll und Halbblock-Zeichen).',
      },
    },
    {
      id: 'portfolio',
      name: 'portfolio-next',
      category: { en: 'This website', de: 'Diese Website' },
      description: {
        en: 'Bilingual static site on TanStack Start, TanStack Redact and Cloudflare Workers with instant, zero-request tab switches.',
        de: 'Zweisprachige statische Seite auf TanStack Start, TanStack Redact und Cloudflare Workers mit sofortigen Tabwechseln ohne Netzwerkanfrage.',
      },
      technologies: ['TanStack Start', 'React', 'Tailwind CSS', 'Cloudflare Workers'],
      url: 'https://github.com/ReynkeDeVos/portfolio-next',
      details: {
        en: 'Full stack breakdown sits at the bottom of Workflow.',
        de: 'Der komplette Stack steht ganz unten im Tab Workflow.',
      },
    },
    {
      id: 'name-shuffler',
      name: 'Name Shuffler CLI',
      category: { en: 'Terminal tool', de: 'Terminal-Werkzeug' },
      description: {
        en: 'Splits a list of names into random groups directly in the terminal.',
        de: 'Verteilt eine Namensliste direkt im Terminal per Zufall auf Gruppen.',
      },
      technologies: ['JavaScript', 'Node.js', 'Inquirer'],
      url: 'https://github.com/ReynkeDeVos/name-shuffler-cli',
      details: {
        en: 'An early experiment in AI-assisted development with Claude.',
        de: 'Ein frühes Experiment mit KI-gestützter Entwicklung und Claude.',
      },
    },
    {
      id: 'elder-gym-bro',
      name: 'Elder Gym Bro App',
      category: { en: 'Bootcamp final team project', de: 'Bootcamp-Abschlussprojekt im Team' },
      description: {
        en: 'Workout planner and progress tracker built with a team of four.',
        de: 'Trainingsplaner und Fortschritts-Tracker, im Viererteam entwickelt.',
      },
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
      url: 'https://github.com/ReynkeDeVos/ElderGymBroApp',
      details: {
        en: 'Built with Michal, Sebastian and Alex; fork of the team repository.',
        de: 'Mit Michal, Sebastian und Alex gebaut; Fork des Team-Repositorys.',
      },
      engineering: {
        en: 'React frontend on Netlify talking to an Express API on Render, storing accounts and workouts in MongoDB and avatars on Cloudinary.',
        de: 'React-Frontend auf Netlify mit Express-API auf Render, MongoDB für Konten und Trainings sowie Cloudinary für Profilbilder.',
      },
    },
    {
      id: 'pokemon-battle',
      name: 'PokémonBattle',
      category: { en: 'Bootcamp team project', de: 'Bootcamp-Teamprojekt' },
      description: {
        en: 'Turn-based Pokémon browser battle game built in a team of three.',
        de: 'Rundenbasiertes Pokémon-Browserspiel, im Dreierteam entwickelt.',
      },
      technologies: ['React', 'Context API', 'CSS'],
      url: 'https://github.com/ReynkeDeVos/PokemonBattle',
      details: {
        en: 'Built with Sebastian and Clara; fork of the team repository.',
        de: 'Mit Sebastian und Clara gebaut; Fork des Team-Repositorys.',
      },
      engineering: {
        en: 'React Context manages battle state on Netlify against an Express API on Render.',
        de: 'React Context verwaltet den Kampfstatus auf Netlify gegen eine Express-API auf Render.',
      },
    },
  ],
} satisfies Content;
