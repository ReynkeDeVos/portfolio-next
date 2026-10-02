import type { Content } from './schema.ts';

// Builders for small, valid Content records; each test changes only what it is about.

function translated(value: string) {
  return { en: `${value} (en)`, de: `${value} (de)` };
}

function fixtureProject(id: string, technologies = ['TypeScript']) {
  return {
    id,
    name: id,
    category: translated(`${id} category`),
    description: translated(`${id} description`),
    details: translated(`${id} details`),
    technologies,
    url: `https://example.com/${id}`,
  };
}

function fixtureExperience(id: string, from: number, to: number | null) {
  return {
    id,
    organization: translated(`${id} organization`),
    url: `https://example.com/${id}`,
    period: { from, to },
    role: translated(`${id} role`),
    description: translated(`${id} description`),
  };
}

function fixtureContent(): Content {
  const image = { src: '/images/portrait.avif', alt: translated('portrait'), width: 1, height: 1 };

  return {
    name: 'Ada Lovelace',
    location: translated('location'),
    emailEncoded: globalThis.btoa('ada@example.com'),
    github: 'https://github.com/ada',
    linkedin: 'https://www.linkedin.com/in/ada/',
    portrait: image,
    fullPortrait: image,
    identity: translated('identity'),
    introduction: translated('introduction'),
    interests: [{ id: 'curious', title: translated('title'), description: translated('text') }],
    coreStrengths: [{ id: 'typescript', name: translated('TypeScript') }],
    technologyNames: { Networking: { en: 'Networking', de: 'Netzwerke' } },
    skills: [
      {
        id: 'languages',
        title: translated('Languages'),
        technologies: ['TypeScript', 'Networking'],
        description: translated('text'),
      },
    ],
    aiRecommendations: {
      updated: '2026-10-01',
      introduction: translated('introduction'),
      items: [
        {
          id: 'build',
          task: translated('Build'),
          model: 'Opus',
          effort: 'Medium',
          note: translated('note'),
        },
      ],
      tips: [
        {
          id: 'harness',
          title: translated('Harness'),
          description: translated('text'),
          links: [{ name: 'pi', url: 'https://pi.dev/' }],
        },
      ],
    },
    portfolioBuild: {
      items: [
        {
          id: 'framework',
          topic: translated('Framework'),
          technologies: ['Vite', 'Zod'],
          description: translated('text'),
        },
      ],
      links: [
        { name: 'Zod', url: 'https://zod.dev/' },
        { name: 'Vite', url: 'https://vite.dev/' },
      ],
    },
    teaching: [{ id: 'web', topic: translated('Web'), technologies: ['HTML', 'Networking'] }],
    experience: [
      fixtureExperience('school', 2025, null),
      fixtureExperience('lab', 2014, 2023),
      fixtureExperience('internship', 2024, 2024),
    ],
    selectedWork: { featured: ['b', 'a'], supporting: ['c'] },
    projects: [
      fixtureProject('a'),
      fixtureProject('b', ['Python', 'Networking']),
      fixtureProject('c'),
      fixtureProject('archive'),
    ],
  };
}

export { fixtureExperience, fixtureContent, fixtureProject, translated };
