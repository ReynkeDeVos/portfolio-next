export const portfolio = {
  name: 'Renke Brixel',
  location: {
    en: 'Based in Hamburg, Germany.',
    de: 'Wohnhaft in Hamburg, Deutschland.',
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
    de: 'Ich lerne gern Neues, programmiere, trinke Kaffee, laufe weit und freunde mich mit Katzen & Hunden an.',
  },
  interests: [
    {
      id: 'exploration',
      title: { en: 'Curious by default', de: 'Neugierig auf Neues' },
      description: {
        en: 'I enjoy trying new technologies and finding out where they help in real projects. This portfolio began as productive procrastination: a chance to try TanStack Start and Cloudflare Workers and finally have a portfolio.',
        de: 'Ich probiere gern neue Technologien aus und finde heraus, wo sie in echten Projekten helfen. Dieses Portfolio entstand aus produktiver Prokrastination: eine Gelegenheit, TanStack Start und Cloudflare Workers auszuprobieren und endlich ein Portfolio zu haben.',
      },
    },
    {
      id: 'terminal',
      title: { en: 'Terminal first', de: 'Terminal zuerst' },
      description: {
        en: 'Linux has been my main operating system for 20+ years. I love Arch Linux and a terminal-first workflow. Linux’s text-based configuration lets AI agents customize the operating system itself, from desktop settings to system services. Faster file access also helps with parallel Git worktrees.',
        de: 'Linux ist seit über 20 Jahren mein Hauptbetriebssystem. Ich liebe Arch Linux und einen terminalbasierten Workflow. Dank der textbasierten Konfiguration können KI-Agenten das Betriebssystem selbst anpassen, von Desktop-Einstellungen bis zu Systemdiensten. Schneller Dateizugriff hilft auch bei parallelen Git-Worktrees.',
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
    { en: 'C#/.NET', de: 'C#/.NET' },
    { en: 'Python', de: 'Python' },
    { en: 'Linux & terminal tools', de: 'Linux & Terminal-Werkzeuge' },
    { en: 'Ultrarunning', de: 'Ultralaufen' },
  ],
  skills: [
    {
      id: 'languages',
      title: { en: 'Languages & foundations', de: 'Sprachen & Grundlagen' },
      technologies: ['TypeScript', 'JavaScript', 'Python', 'C#', 'SQL', 'HTML', 'CSS', 'zsh'],
      description: {
        en: 'I build frontends with React and TypeScript, and backends with TypeScript on Node.js as well as C# on .NET. For algorithms and data structures I use Python. Object-oriented design and asynchronous programming are part of my teaching and development work.',
        de: 'Frontends entwickle ich mit React und TypeScript, Backends sowohl mit TypeScript auf Node.js als auch mit C# auf .NET. Für Algorithmen und Datenstrukturen nutze ich Python. Objektorientiertes Design und asynchrone Programmierung gehören zu meiner Lehr- und Entwicklungsarbeit.',
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
        en: 'Interfaces, routing, server rendering, state and data validation. TanStack Start and shadcn/ui are part of this portfolio’s stack.',
        de: 'Oberflächen, Routing, Server-Rendering, Zustandsverwaltung und Datenvalidierung. TanStack Start und shadcn/ui gehören zum Stack dieses Portfolios.',
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
        en: 'API design, persistence and authentication with custom JWT/cookie solutions, ASP.NET Core Identity and Better Auth.',
        de: 'API-Design, Persistenz und Authentifizierung mit eigenen JWT-/Cookie-Lösungen, ASP.NET Core Identity und Better Auth.',
      },
    },
    {
      id: 'quality',
      title: { en: 'Quality & delivery', de: 'Qualität & Bereitstellung' },
      technologies: [
        'Vitest',
        'Testing Library',
        'GitHub Actions',
        'Docker',
        'Podman',
        'Azure',
        'Git',
        'Oxc',
        'Fallow',
      ],
      description: {
        en: 'I write unit and integration tests, use Docker and Podman, and deploy applications to Cloudflare, Render, Vercel or Railway.',
        de: 'Ich schreibe Unit- und Integrationstests, nutze Docker und Podman und veröffentliche Anwendungen auf Cloudflare, Render, Vercel oder Railway.',
      },
    },
    {
      id: 'ai-tools',
      title: { en: 'AI & automation', de: 'KI & Automatisierung' },
      technologies: [
        'OpenAI SDK',
        'OpenAI Agents SDK',
        'Anthropic SDK',
        'Google Gen AI SDK',
        'Claude Agent SDK',
        'MCP',
        'Ollama',
        'n8n',
        'claude',
        'Codex',
        'pi',
        'GitHub Copilot',
        'OpenSpec',
        'Matt Pocock skills',
      ],
      description: {
        en: 'Teaching examples and experiments with streaming, tool calls, agent handoffs, guardrails and local models, plus spec-driven development with coding agents.',
        de: 'Lehrbeispiele und Experimente mit Streaming, Tool-Aufrufen, Agenten-Übergaben, Guardrails und lokalen Modellen sowie spezifikationsgetriebene Entwicklung mit Coding-Agenten.',
      },
    },
  ],
  aiRecommendations: {
    updated: '2026-10-01',
    introduction: {
      en: 'With Opus 5.5, avoid Low and Max. For GPT-6.1 Sol, skip Max and use Extra High (xhigh) only when High falls short; try Low only for small, well-defined tasks.',
      de: 'Bei Opus 5.5 Low und Max vermeiden. Bei GPT-6.1 Sol Max auslassen und Extra High (xhigh) nur nutzen, wenn High nicht ausreicht; Low nur für kleine, klar definierte Aufgaben ausprobieren.',
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
    tips: [
      {
        id: 'harness',
        title: { en: 'Harness', de: 'Harness' },
        description: {
          en: 'T3 Code for a clear overview of agent sessions; pi for project-specific workflows. herdr + Tailscale for persistent agent sessions you can reach remotely.',
          de: 'T3 Code für einen klaren Überblick über Agentensitzungen, pi für projektspezifische Abläufe. herdr + Tailscale für dauerhafte Agentensitzungen mit Remote-Zugriff.',
        },
        links: [
          { name: 'T3 Code', url: 'https://t3.codes/' },
          { name: 'herdr', url: 'https://herdr.dev/' },
          { name: 'pi', url: 'https://pi.dev/' },
          { name: 'Tailscale', url: 'https://tailscale.com/' },
        ],
      },
      {
        id: 'design',
        title: { en: 'Design', de: 'Design' },
        description: {
          en: 'Interface design, critique and polish.',
          de: 'Oberflächendesign, Designkritik und Feinschliff.',
        },
        links: [{ name: 'Impeccable', url: 'https://impeccable.style/' }],
      },
      {
        id: 'planning',
        title: { en: 'Planning', de: 'Planung' },
        description: {
          en: 'wayfinder for open decisions; OpenSpec as an alternative for specs and tasks.',
          de: 'wayfinder für offene Entscheidungen, alternativ OpenSpec für Specs und Aufgaben.',
        },
        links: [
          {
            name: 'wayfinder',
            url: 'https://www.aihero.dev/skills-wayfinder',
          },
          { name: 'OpenSpec', url: 'https://openspec.dev/' },
        ],
      },
      {
        id: 'engineering-skills',
        title: { en: 'Development', de: 'Entwicklung' },
        description: {
          en: 'Matt Pocock’s skills for requirements and code review.',
          de: 'Matt Pococks Skills für Anforderungen und Code-Reviews.',
        },
        links: [
          {
            name: 'grill-with-docs',
            url: 'https://www.aihero.dev/skills-grill-with-docs',
          },
          {
            name: 'code-review',
            url: 'https://www.aihero.dev/skills-code-review',
          },
        ],
      },
    ],
  },
  portfolioBuild: {
    items: [
      {
        id: 'rendering',
        topic: { en: 'Framework', de: 'Framework' },
        technologies: ['React 19', 'TanStack Start', 'Vite 8'],
        description: {
          en: 'Prerenders both language versions to static HTML. Switching tabs sends no network request.',
          de: 'Rendert beide Sprachfassungen vorab als statisches HTML. Tabwechsel senden keine Netzwerkanfrage.',
        },
      },
      {
        id: 'interface',
        topic: { en: 'Components', de: 'Komponenten' },
        technologies: ['shadcn/ui', 'Tailwind CSS 4', 'cn', '@shadcn/lint', 'Lucide'],
        description: {
          en: 'shadcn/ui copies the component source into the repo, so I fully own the code. cn replaces clsx and tailwind-merge; the shadcn linter flags raw colors and off-token values.',
          de: 'shadcn/ui kopiert den Quellcode der Komponenten ins Repository, so gehört der Code vollständig mir. cn ersetzt clsx und tailwind-merge; der shadcn-Linter meldet feste Farben und Werte außerhalb der Tokens.',
        },
      },
      {
        id: 'content',
        topic: { en: 'Content', de: 'Inhalte' },
        technologies: ['Zod'],
        description: {
          en: 'I use Zod before each build to catch missing translations, empty text and malformed URLs in the English and German content.',
          de: 'Vor jedem Build prüfe ich die englischen und deutschen Inhalte mit Zod auf fehlende Übersetzungen, leere Texte und ungültige URLs.',
        },
      },
      {
        id: 'packages',
        topic: { en: 'Runtime & packages', de: 'Laufzeit & Pakete' },
        technologies: ['mise', 'Node.js', 'aube'],
        description: {
          en: 'mise pins Node LTS, which runs the TypeScript scripts and tests. aube, from the developer of mise, is fast and works with existing pnpm, npm, Yarn and Bun lockfiles. Before choosing a version, it checks publishing evidence, release age and known malicious packages.',
          de: 'mise legt Node LTS fest, das die TypeScript-Skripte und Tests ausführt. aube vom Entwickler von mise ist schnell und arbeitet mit bestehenden Lockfiles von pnpm, npm, Yarn und Bun. Vor der Wahl einer Version prüft es Veröffentlichungsnachweise, Alter des Releases und bekannte Schadpakete.',
        },
      },
      {
        id: 'tooling',
        topic: { en: 'Code quality', de: 'Codequalität' },
        technologies: ['TypeScript 7', 'Oxlint', 'Oxfmt', 'Fallow'],
        description: {
          en: 'TypeScript 7’s compiler is ported to Go and about 10x faster; Oxlint uses it for type-aware rules. Oxlint and Oxfmt come from VoidZero and replace ESLint and Prettier with Rust-based tools; Oxlint also runs anti-slop rules. Fallow finds unused files, exports and dependencies as well as duplicated code.',
          de: 'Der Compiler von TypeScript 7 ist nach Go portiert und etwa zehnmal schneller; Oxlint nutzt ihn für typbasierte Regeln. Oxlint und Oxfmt stammen von VoidZero und ersetzen ESLint und Prettier durch Rust-basierte Werkzeuge; Oxlint prüft zusätzlich Anti-Slop-Regeln. Fallow findet ungenutzte Dateien, Exporte und Abhängigkeiten sowie doppelten Code.',
        },
      },
      {
        id: 'images',
        topic: { en: 'Design & assets', de: 'Design & Assets' },
        technologies: ['Material 3 Expressive', 'Google Sans Flex', 'Roboto Flex', 'AVIF'],
        description: {
          en: 'The design follows Material 3 Expressive, with its typeface Google Sans Flex for headings. The portraits are AVIF files, smaller than WebP at similar quality.',
          de: 'Das Design folgt Material 3 Expressive, mit dessen Schrift Google Sans Flex für Überschriften. Die Porträts sind AVIF-Dateien, kleiner als WebP bei ähnlicher Qualität.',
        },
      },
      {
        id: 'hosting',
        topic: { en: 'Deployment', de: 'Deployment' },
        technologies: ['Cloudflare Workers', 'Wrangler'],
        description: {
          en: 'Prepared as the hosting target. Cloudflare is an official TanStack Start hosting partner and acquired VoidZero in 2026.',
          de: 'Als Hosting-Ziel vorbereitet. Cloudflare ist offizieller Hosting-Partner von TanStack Start und hat 2026 VoidZero übernommen.',
        },
      },
    ],
    links: [
      { name: 'React 19', url: 'https://react.dev/' },
      { name: 'TanStack Start', url: 'https://tanstack.com/start' },
      { name: 'Vite 8', url: 'https://vite.dev/' },
      { name: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
      { name: 'Tailwind CSS 4', url: 'https://tailwindcss.com/' },
      { name: 'cn', url: 'https://github.com/shadcn-ui/cn' },
      { name: '@shadcn/lint', url: 'https://github.com/shadcn-ui/lint' },
      { name: 'Lucide', url: 'https://lucide.dev/' },
      { name: 'Zod', url: 'https://zod.dev/' },
      { name: 'mise', url: 'https://mise.jdx.dev/' },
      { name: 'Node.js', url: 'https://nodejs.org/' },
      { name: 'aube', url: 'https://aube.sh/' },
      { name: 'TypeScript 7', url: 'https://www.typescriptlang.org/' },
      { name: 'Oxlint', url: 'https://oxc.rs/' },
      { name: 'Oxfmt', url: 'https://oxc.rs/' },
      { name: 'Fallow', url: 'https://fallow.tools/' },
      { name: 'Material 3 Expressive', url: 'https://m3.material.io/' },
      { name: 'AVIF', url: 'https://aomediacodec.github.io/av1-avif/' },
      { name: 'Google Sans Flex', url: 'https://fonts.google.com/specimen/Google+Sans+Flex' },
      { name: 'Roboto Flex', url: 'https://fonts.google.com/specimen/Roboto+Flex' },
      { name: 'Cloudflare Workers', url: 'https://www.cloudflare.com/products/workers/' },
      { name: 'Wrangler', url: 'https://github.com/cloudflare/workers-sdk' },
    ],
  },
  teaching: [
    {
      en: 'Web foundations',
      de: 'Web-Grundlagen',
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'Git', 'GitHub'],
    },
    {
      en: 'Frontend development',
      de: 'Frontend-Entwicklung',
      technologies: ['React', 'TypeScript', 'Vite'],
    },
    {
      en: 'React frameworks & data',
      de: 'React-Frameworks & Daten',
      technologies: ['Next.js', 'React Router', 'TanStack Query', 'Zod'],
    },
    {
      en: 'Node APIs in JavaScript & TypeScript',
      de: 'Node-APIs mit JavaScript & TypeScript',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Zod', 'Swagger'],
    },
    {
      en: 'Authentication',
      de: 'Authentifizierung',
      technologies: ['JWT', 'Cookies', 'bcrypt', 'ASP.NET Core Identity', 'Better Auth'],
    },
    { en: 'C# & .NET', de: 'C# & .NET', technologies: ['C#', '.NET', 'LINQ'] },
    {
      en: '.NET APIs & persistence',
      de: '.NET-APIs & Persistenz',
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
      en: 'Algorithms & data structures',
      de: 'Algorithmen & Datenstrukturen',
      technologies: ['Python'],
    },
    {
      en: 'Python web & SQL',
      de: 'Python-Webentwicklung & SQL',
      technologies: ['Flask', 'PostgreSQL'],
    },
    {
      en: 'Computer science & terminal',
      de: 'Informatik & Terminal',
      technologies: ['Networking', 'HTTP', 'Bash', 'zsh'],
    },
    {
      en: 'Testing & delivery',
      de: 'Tests & Bereitstellung',
      technologies: ['Vitest', 'Testing Library', 'GitHub Actions', 'Docker Compose', 'Azure'],
    },
    {
      en: 'AI integration',
      de: 'KI-Integration',
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
      en: 'AI-assisted coding & automation',
      de: 'KI-gestütztes Programmieren & Automatisierung',
      technologies: ['GitHub Copilot', 'OpenSpec', 'Matt Pocock skills', 'n8n'],
    },
  ],
  experience: [
    {
      organization: { en: 'WBS Coding School', de: 'WBS Coding School' },
      url: 'https://www.wbscodingschool.com/',
      period: '2025-present',
      role: { en: 'Software development instructor', de: 'Dozent für Softwareentwicklung' },
      description: {
        en: 'I teach modern web development, frontend and backend.',
        de: 'Ich unterrichte moderne Webentwicklung für Frontend und Backend.',
      },
    },
    {
      organization: { en: 'Closelink', de: 'Closelink' },
      url: 'https://www.closelink.com/',
      period: '2024',
      role: { en: 'Frontend development intern', de: 'Praktikant Frontend-Entwicklung' },
      description: {
        en: 'I modernized interface components with React, TypeScript and Formik and worked with the developers and the designer to improve workflows for business customers.',
        de: 'Ich habe Oberflächenkomponenten mit React, TypeScript und Formik modernisiert und mit Entwicklung und Design die Arbeitsabläufe für die Geschäftskunden verbessert.',
      },
    },
    {
      organization: { en: 'Leibniz Institute for Virology', de: 'Leibniz-Institut für Virologie' },
      url: 'https://www.leibniz-liv.de/en/research/research-units/virus-host-interaction',
      period: '2014-2023',
      role: { en: 'Biological-technical assistant', de: 'Biologisch-technischer Assistent' },
      description: {
        en: 'I researched how common viruses hijack human cells. As hazardous materials officer, I introduced software solutions and trained the team, and I helped manage the lab in multidisciplinary teams.',
        de: 'Ich habe erforscht, wie verbreitete Viren menschliche Zellen kapern. Als Gefahrstoffbeauftragter habe ich Softwarelösungen eingeführt und das Team geschult und in fachübergreifenden Teams das Labor mitorganisiert.',
      },
    },
    {
      organization: {
        en: 'University Medical Center Hamburg-Eppendorf',
        de: 'Universitätsklinikum Hamburg-Eppendorf',
      },
      url: 'https://www.uke.de/kliniken-institute/institute/institut-f%C3%BCr-tumorbiologie/index.html',
      period: '2012-2014',
      role: { en: 'Biological-technical assistant', de: 'Biologisch-technischer Assistent' },
      description: {
        en: 'I studied what triggers breast cancer cells to spread to other parts of the body, analysed samples, maintained the database and supervised interns.',
        de: 'Ich habe untersucht, was Brustkrebszellen dazu bringt, sich in andere Körperregionen auszubreiten, Proben analysiert, die Datenbank gepflegt und Praktikantinnen und Praktikanten betreut.',
      },
    },
    {
      organization: {
        en: 'University of Utah School of Medicine',
        de: 'University of Utah School of Medicine',
      },
      url: 'https://medicine.utah.edu/',
      period: '2012',
      role: { en: 'Research intern', de: 'Forschungspraktikant' },
      description: {
        en: 'I reprogrammed patient skin cells into neurons to model brain injury risks during heart transplantation and maintained the plasmid database. I also built a team to-do app for phone and desktop on software the lab already licensed.',
        de: 'Ich habe Hautzellen aus Patientenproben zu Nervenzellen umprogrammiert, um das Risiko von Hirnschäden bei Herztransplantationen zu modellieren, und die Plasmid-Datenbank gepflegt. Außerdem habe ich auf Basis bereits lizenzierter Software eine To-do-App fürs Team gebaut, für Smartphone und Desktop.',
      },
    },
  ],
  // Display order is set here, not by catalog order. Catalog records that are
  // not listed stay in the catalog without being shown.
  selectedWork: {
    featured: ['reputation-assistant', 'scoundrel-tui', 'pokemon-battle'],
    supporting: ['elder-gym-bro', 'omarchy-stats'],
  },
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
    },
    {
      id: 'name-shuffler',
      name: 'Name Shuffler CLI',
      category: { en: 'Terminal tool', de: 'Terminal-Werkzeug' },
      description: {
        en: 'Enter a list of names and choose how many groups you need. The tool randomly assigns people to those groups, directly in the terminal.',
        de: 'Namen eingeben und die gewünschte Anzahl an Gruppen wählen. Das Werkzeug verteilt die Personen per Zufall auf diese Gruppen, direkt im Terminal.',
      },
      technologies: ['JavaScript', 'Node.js', 'Inquirer'],
      url: 'https://github.com/ReynkeDeVos/name-shuffler-cli',
      details: {
        en: 'An experiment in AI-assisted development with Claude.',
        de: 'Ein Experiment mit KI-gestützter Entwicklung und Claude.',
      },
    },
    {
      id: 'elder-gym-bro',
      name: 'Elder Gym Bro App',
      category: { en: 'Bootcamp final team project', de: 'Bootcamp-Abschlussprojekt im Team' },
      description: {
        en: 'A fitness app for planning workouts and following your progress.',
        de: 'Eine Fitness-App, mit der man Trainings plant und die eigenen Fortschritte verfolgt.',
      },
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
      url: 'https://github.com/ReynkeDeVos/ElderGymBroApp',
      details: {
        en: 'Built by a team of four: Michal, Sebastian, Alex and Renke.',
        de: 'Im Viererteam mit Michal, Sebastian, Alex und Renke entwickelt.',
      },
    },
    {
      id: 'pokemon-battle',
      name: 'PokémonBattle',
      category: { en: 'Bootcamp team project', de: 'Bootcamp-Teamprojekt' },
      description: {
        en: 'A browser game in which Pokémon creatures fight each other.',
        de: 'Ein Browserspiel, in dem Pokémon-Figuren gegeneinander kämpfen.',
      },
      technologies: ['React', 'Context API', 'CSS'],
      url: 'https://github.com/ReynkeDeVos/PokemonBattle',
      details: {
        en: 'Built with Sebastian and Clara during the bootcamp. This is my fork of the team repository.',
        de: 'Mit Sebastian und Clara im Bootcamp entwickelt. Das ist mein Fork des Team-Repositorys.',
      },
    },
  ],
};
