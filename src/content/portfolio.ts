export const portfolio = {
  name: 'Renke Brixel',
  location: 'Hamburg, Germany',
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
      de: 'Renke Brixel mit einem Laptop',
    },
    width: 720,
    height: 1080,
  },
  identity: {
    en: 'Software developer in Hamburg, Germany',
    de: 'Softwareentwickler in Hamburg, Deutschland',
  },
  introduction: {
    en: 'I build web applications, game mods and tools for the terminal and Linux desktop.',
    de: 'Ich entwickle Webanwendungen, Spiele-Mods und Werkzeuge für Terminal und Linux-Desktop.',
  },
  interests: [
    {
      id: 'exploration',
      title: { en: 'Curious by default', de: 'Neugierig auf Neues' },
      description: {
        en: 'I enjoy trying new technologies and finding out where they help in real projects. This portfolio is one of them; its stack is listed below.',
        de: 'Ich probiere gern neue Technologien aus und finde heraus, wo sie in echten Projekten helfen. Dieses Portfolio ist eines davon; sein Stack steht weiter unten.',
      },
    },
    {
      id: 'terminal',
      title: { en: 'Terminal first', de: 'Terminal zuerst' },
      description: {
        en: 'I love a terminal-first workflow and Arch Linux. Linux has been part of my life for more than 20 years.',
        de: 'Ich liebe einen terminalbasierten Workflow und Arch Linux. Linux begleitet mich seit mehr als 20 Jahren.',
      },
    },
    {
      id: 'ai',
      title: { en: 'AI with a purpose', de: 'KI mit einem Zweck' },
      description: {
        en: 'I follow AI news daily and evaluate which tools actually help me build, investigate and review software. I participated in the Claude Code for Business course as part of our company’s preparation for the business partner program.',
        de: 'Ich verfolge täglich KI-Nachrichten und prüfe, welche Werkzeuge mir beim Entwickeln, Untersuchen und Prüfen von Software wirklich helfen. Ich habe am Kurs Claude Code for Business teilgenommen, um unser Unternehmen auf das Business-Partnerprogramm vorzubereiten.',
      },
    },
  ],
  coreStrengths: [
    { en: 'React & TypeScript', de: 'React & TypeScript' },
    { en: 'C#/.NET & Python', de: 'C#/.NET & Python' },
    { en: 'Linux & terminal tools', de: 'Linux & Terminal-Werkzeuge' },
  ],
  skills: [
    {
      id: 'languages',
      title: { en: 'Languages & foundations', de: 'Sprachen & Grundlagen' },
      technologies: ['TypeScript', 'JavaScript', 'Python', 'C#', 'SQL', 'HTML', 'CSS', 'Bash'],
      description: {
        en: 'Algorithms, data structures, object-oriented design and asynchronous programming are part of my teaching and development work.',
        de: 'Algorithmen, Datenstrukturen, objektorientiertes Design und asynchrone Programmierung gehören zu meiner Lehr- und Entwicklungsarbeit.',
      },
    },
    {
      id: 'web',
      title: { en: 'Web interfaces', de: 'Weboberflächen' },
      technologies: ['React', 'Next.js', 'React Router', 'TanStack Query', 'Tailwind CSS', 'Zod'],
      description: {
        en: 'Interfaces, routing, server rendering, state and data validation. TanStack Start, shadcn/ui and Effect are part of this portfolio’s stack.',
        de: 'Oberflächen, Routing, Server-Rendering, Zustandsverwaltung und Datenvalidierung. TanStack Start, shadcn/ui und Effect gehören zum Stack dieses Portfolios.',
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
        'PostgreSQL',
        'MongoDB',
        'Mongoose',
        'SQLite',
        'REST',
        'OpenAPI',
      ],
      description: {
        en: 'API design, persistence and authentication, including custom JWT/cookie flows and ASP.NET Core Identity. Better Auth is being prepared alongside the custom solution.',
        de: 'API-Design, Persistenz und Authentifizierung, einschließlich eigener JWT-/Cookie-Abläufe und ASP.NET Core Identity. Better Auth wird ergänzend zur eigenen Lösung vorbereitet.',
      },
    },
    {
      id: 'quality',
      title: { en: 'Quality & delivery', de: 'Qualität & Bereitstellung' },
      technologies: [
        'Vitest',
        'Testing Library',
        'xUnit',
        'pytest',
        'GitHub Actions',
        'Docker',
        'Azure',
        'Git',
        'Oxc',
      ],
      description: {
        en: 'Unit and integration testing, container workflows and delivery. Cloudflare is the prepared hosting target for this portfolio.',
        de: 'Unit- und Integrationstests, Container-Workflows und Bereitstellung. Cloudflare ist als Hosting-Ziel für dieses Portfolio vorbereitet.',
      },
    },
    {
      id: 'ai-tools',
      title: { en: 'AI & automation', de: 'KI & Automatisierung' },
      technologies: ['OpenAI SDK', 'Agents SDK', 'MCP', 'n8n', 'Claude Code'],
      description: {
        en: 'Teaching examples and experiments with streaming, tool calls, agent handoffs and guardrails, alongside practical Claude Code workflows.',
        de: 'Lehrbeispiele und Experimente mit Streaming, Tool-Aufrufen, Agenten-Übergaben und Guardrails sowie praktischen Claude-Code-Workflows.',
      },
    },
  ],
  aiRecommendations: {
    updated: '2026-10-01',
    introduction: {
      en: 'My current starting points, chosen by task. Thinking levels are settings to try, not a promise of better results.',
      de: 'Meine aktuellen Ausgangspunkte, passend zur Aufgabe. Denkstufen sind Einstellungen zum Ausprobieren, kein Versprechen für bessere Ergebnisse.',
    },
    items: [
      {
        task: { en: 'Build & implement', de: 'Entwickeln & umsetzen' },
        model: 'Opus 5.5',
        effort: 'Medium',
        note: { en: 'High for complex work', de: 'High für komplexe Aufgaben' },
      },
      {
        task: { en: 'Investigate & debug', de: 'Untersuchen & debuggen' },
        model: 'GPT-6.1 Sol',
        effort: 'Medium',
        note: { en: 'High for difficult diagnosis', de: 'High für schwierige Diagnosen' },
      },
      {
        task: { en: 'Review code', de: 'Code prüfen' },
        model: 'GPT-6.1 Sol',
        effort: 'High',
        note: { en: 'Independent review', de: 'Unabhängige Prüfung' },
      },
      {
        task: { en: 'Explore visual design', de: 'Visuelles Design erkunden' },
        model: 'Opus 5.5',
        effort: 'Medium',
        note: { en: 'Layout and visual refinements', de: 'Layout und visuelle Verfeinerung' },
      },
    ],
  },
  portfolioBuild: {
    introduction: {
      en: 'A small, real project for trying current tools. What it uses and why:',
      de: 'Ein kleines, echtes Projekt, an dem ich aktuelle Werkzeuge ausprobiere. Was es nutzt und warum:',
    },
    items: [
      {
        id: 'rendering',
        topic: { en: 'Rendering', de: 'Rendering' },
        technologies: ['TanStack Start', 'React 19', 'TypeScript 7', 'Vite 8'],
        description: {
          en: 'The English and German pages are prerendered as static HTML. Every section ships with the page, so tabs switch instantly without loading anything.',
          de: 'Die englische und die deutsche Seite werden als statisches HTML vorgerendert. Alle Bereiche sind bereits enthalten, daher wechseln Tabs sofort und ohne Nachladen.',
        },
      },
      {
        id: 'interface',
        topic: { en: 'Interface', de: 'Oberfläche' },
        technologies: ['Tailwind CSS 4', 'shadcn/ui', 'Radix'],
        description: {
          en: 'Editable shadcn components on Radix provide keyboard navigation and focus handling. Material 3 Expressive guides color, shape and motion without an extra component framework.',
          de: 'Anpassbare shadcn-Komponenten auf Radix-Basis liefern Tastaturbedienung und Fokusführung. Material 3 Expressive prägt Farben, Formen und Bewegung ohne zusätzliches Komponenten-Framework.',
        },
      },
      {
        id: 'design',
        topic: { en: 'Design', de: 'Gestaltung' },
        technologies: ['Roboto Flex', 'CSS', 'AVIF'],
        description: {
          en: 'A self-hosted variable font, color themes that switch in one step and native CSS motion that respects reduced-motion settings. Portraits come from the original camera files with conventional crops and no AI editing.',
          de: 'Eine selbst gehostete variable Schrift, Farbschemata, die in einem Schritt wechseln, und native CSS-Animationen, die reduzierte Bewegung respektieren. Die Porträts stammen aus den Original-Kameradateien, klassisch zugeschnitten und ohne KI-Bearbeitung.',
        },
      },
      {
        id: 'content',
        topic: { en: 'Content', de: 'Inhalte' },
        technologies: ['Zod', 'Effect'],
        description: {
          en: 'Both language versions are validated at build time, outside the code visitors download.',
          de: 'Beide Sprachfassungen werden beim Build geprüft, außerhalb des Codes, den Besucher laden.',
        },
      },
      {
        id: 'tooling',
        topic: { en: 'Tooling', de: 'Werkzeuge' },
        technologies: ['mise', 'Nub', 'aube', 'Oxlint', 'Oxfmt'],
        description: {
          en: 'mise pins the Node and Nub versions. Nub launches the tooling on stock Node, aube manages dependencies and the lockfile, and Oxlint and Oxfmt lint and format the code.',
          de: 'mise legt die Versionen von Node und Nub fest. Nub startet die Werkzeuge auf Standard-Node, aube verwaltet Abhängigkeiten und Lockfile, Oxlint und Oxfmt prüfen und formatieren den Code.',
        },
      },
      {
        id: 'hosting',
        topic: { en: 'Hosting', de: 'Hosting' },
        technologies: ['Cloudflare Workers'],
        description: {
          en: 'The prepared hosting target, where workerd runs the server build. Nub stays a local development tool.',
          de: 'Das vorbereitete Hosting-Ziel, auf dem workerd den Server-Build ausführt. Nub bleibt ein lokales Entwicklungswerkzeug.',
        },
      },
    ],
    links: [{ name: 'mise', url: 'https://mise.jdx.dev/' }],
  },
  teaching: [
    {
      en: 'Frontend development',
      de: 'Frontend-Entwicklung',
      technologies: ['React', 'TypeScript'],
    },
    {
      en: 'Algorithms & data structures',
      de: 'Algorithmen & Datenstrukturen',
      technologies: ['Python'],
    },
    { en: 'Backend development', de: 'Backend-Entwicklung', technologies: ['C#', '.NET'] },
    {
      en: 'React frameworks & data',
      de: 'React-Frameworks & Daten',
      technologies: ['Next.js', 'React Router', 'TanStack Query', 'Zod'],
    },
    {
      en: 'Python web & SQL',
      de: 'Python-Webentwicklung & SQL',
      technologies: ['Flask', 'PostgreSQL'],
    },
    {
      en: 'Node APIs & authentication',
      de: 'Node-APIs & Authentifizierung',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    },
    {
      en: '.NET APIs & persistence',
      de: '.NET-APIs & Persistenz',
      technologies: ['ASP.NET Core', 'Entity Framework Core', 'ASP.NET Core Identity', 'OpenAPI'],
    },
    {
      en: 'Testing & delivery',
      de: 'Tests & Bereitstellung',
      technologies: [
        'Vitest',
        'Testing Library',
        'xUnit',
        'WebApplicationFactory',
        'GitHub Actions',
        'Docker',
        'Azure',
      ],
    },
    {
      en: 'AI integration & automation',
      de: 'KI-Integration & Automatisierung',
      technologies: ['OpenAI SDK', 'Agents SDK', 'MCP', 'n8n'],
    },
  ],
  experience: [
    {
      organization: 'WBS Coding School',
      period: '2025-present',
      role: { en: 'Software development instructor', de: 'Dozent für Softwareentwicklung' },
    },
    {
      organization: 'Closelink',
      period: '2024',
      role: { en: 'Frontend development intern', de: 'Praktikant Frontend-Entwicklung' },
    },
    {
      organization: 'Leibniz Institute for Virology',
      period: '2014-2023',
      role: { en: 'Biological-technical assistant', de: 'Biologisch-technischer Assistent' },
    },
    {
      organization: 'University Medical Center Hamburg-Eppendorf',
      period: '2012-2014',
      role: { en: 'Biological-technical assistant', de: 'Biologisch-technischer Assistent' },
    },
    {
      organization: 'University of Utah School of Medicine',
      period: '2012',
      role: { en: 'Research intern', de: 'Forschungspraktikant' },
    },
  ],
  projects: [
    {
      id: 'reputation-assistant',
      name: 'Reputation Assistant',
      category: { en: 'Add-on for Caves of Qud', de: 'Erweiterung für Caves of Qud' },
      description: {
        en: 'In the role-playing game Caves of Qud, you meet characters who belong to different groups, and each group thinks better or worse of your character. When you take a closer look at someone you meet, this add-on shows how their groups see you and how an action could change that. That helps you decide what to do next.',
        de: 'Im Rollenspiel Caves of Qud begegnet man Figuren, die zu verschiedenen Gruppen gehören. Jede Gruppe ist der eigenen Spielfigur mehr oder weniger wohlgesonnen. Sieht man sich eine Figur genauer an, zeigt die Erweiterung, wie ihre Gruppen zur eigenen Spielfigur stehen und wie eine Handlung das verändern könnte. Das hilft bei der Entscheidung, was man als Nächstes tut.',
      },
      technologies: ['C#', 'Harmony'],
      url: 'https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant',
      details: {
        en: 'Players can choose which groups matter most to them. The default settings follow the reputation guide on qudzoo.',
        de: 'Man kann festlegen, welche Gruppen einem am wichtigsten sind. Die Standardeinstellungen folgen dem Ruf-Leitfaden von qudzoo.',
      },
      featured: true,
    },
    {
      id: 'scoundrel-tui',
      name: 'Scoundrel TUI',
      category: { en: 'Card game for the terminal', de: 'Kartenspiel fürs Terminal' },
      description: {
        en: 'A card game with illustrated cards that runs in the terminal, the text-based workspace on a computer. You play it entirely with the keyboard.',
        de: 'Ein Kartenspiel mit illustrierten Karten. Es läuft im Terminal, dem textbasierten Arbeitsbereich eines Computers, und wird komplett mit der Tastatur gespielt.',
      },
      technologies: ['Python', 'Textual'],
      url: 'https://github.com/ReynkeDeVos/Scoundrel-TUI',
      details: {
        en: 'Based on the card game Scoundrel by Zach Gage and Kurt Bieg. Credits for the game and the artwork are in the repository.',
        de: 'Nach dem Kartenspiel Scoundrel von Zach Gage und Kurt Bieg. Die Nachweise für Spiel und Bilder stehen im Repository.',
      },
      featured: true,
    },
    {
      id: 'omarchy-stats',
      name: 'Omarchy System Stats',
      category: { en: 'Linux desktop add-on', de: 'Erweiterung für den Linux-Desktop' },
      description: {
        en: 'Shows how busy the processor, memory and graphics card are, right on the Linux desktop.',
        de: 'Zeigt direkt auf dem Linux-Desktop, wie stark Prozessor, Arbeitsspeicher und Grafikkarte ausgelastet sind.',
      },
      technologies: ['QML', 'C', 'Quickshell', 'Linux'],
      url: 'https://github.com/ReynkeDeVos/omarchy-plugin-system-stats',
      details: {
        en: 'If a computer does not provide one of these values, the display says so.',
        de: 'Liefert ein Rechner einen dieser Werte nicht, zeigt die Anzeige das an.',
      },
      featured: true,
    },
    {
      id: 'blitzlesen',
      name: 'Blitzlesen',
      category: { en: 'Browser game', de: 'Browserspiel' },
      description: {
        en: 'A browser game about recognizing words quickly. You pick words against the clock, choose a difficulty level and hear a sound for each answer.',
        de: 'Ein Browserspiel rund ums schnelle Erkennen von Wörtern. Man wählt Wörter gegen die Zeit, stellt den Schwierigkeitsgrad ein und hört zu jeder Antwort einen Ton.',
      },
      technologies: ['React', 'JavaScript', 'Vite', 'Tailwind CSS'],
      url: 'https://github.com/ReynkeDeVos/blitzlesen-app',
      details: {
        en: 'Points show how well you are doing.',
        de: 'Punkte zeigen, wie gut es läuft.',
      },
      featured: false,
    },
    {
      id: 'elder-gym-bro',
      name: 'Elder Gym Bro App',
      category: { en: 'Team project', de: 'Teamprojekt' },
      description: {
        en: 'A fitness app for planning workouts and following your progress.',
        de: 'Eine Fitness-App, mit der man Trainings plant und die eigenen Fortschritte verfolgt.',
      },
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
      url: 'https://github.com/ReynkeDeVos/ElderGymBroApp',
      details: {
        en: 'A final project by a team of four: Michal, Sebastian, Alex and Renke.',
        de: 'Ein Abschlussprojekt im Viererteam mit Michal, Sebastian, Alex und Renke.',
      },
      featured: false,
    },
    {
      id: 'pokemon-battle',
      name: 'PokémonBattle',
      category: { en: 'Collaborative fork', de: 'Gemeinschaftlicher Fork' },
      description: {
        en: 'A browser game in which Pokémon creatures fight each other.',
        de: 'Ein Browserspiel, in dem Pokémon-Figuren gegeneinander kämpfen.',
      },
      technologies: ['React', 'Context API', 'CSS'],
      url: 'https://github.com/ReynkeDeVos/PokemonBattle',
      details: {
        en: 'A fork of EinKinddesWindes/PokemonBattle. Renke’s share of the work is not yet confirmed.',
        de: 'Ein Fork von EinKinddesWindes/PokemonBattle. Renkes Anteil an der Arbeit ist noch nicht bestätigt.',
      },
      featured: false,
    },
  ],
};
