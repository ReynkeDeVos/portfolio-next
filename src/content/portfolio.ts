export const portfolio = {
  name: 'Renke Brixel',
  location: 'Hamburg, Germany',
  email: 'renke.brixel@gmail.com',
  github: 'https://github.com/ReynkeDeVos',
  linkedin: 'https://www.linkedin.com/in/rbrixel/',
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
      name: 'Elder Gym Bro App',
      description: {
        en: 'A fitness tracker with workout planning and progress tracking.',
        de: 'Ein Fitness-Tracker für Trainingsplanung und Fortschritt.',
      },
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
    },
    {
      name: 'PokémonBattle',
      description: {
        en: 'An interactive Pokémon arena built with React.',
        de: 'Eine interaktive Pokémon-Arena mit React.',
      },
      technologies: ['React', 'Context API', 'CSS'],
    },
  ],
};
