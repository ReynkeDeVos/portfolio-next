import { z } from 'zod';

import { portfolio } from '../src/content/portfolio.ts';
import { validateSelectedWork } from './validate-selected-work.ts';

const text = z.string().min(1);

const technologies = z.array(text).min(1);

const translatedText = z.object({ en: text, de: text });

const teachingTopic = translatedText.extend({ technologies });

const experience = z.object({
  organization: translatedText,
  url: z.url(),
  period: text,
  role: translatedText,
  description: translatedText,
});

const project = z.object({
  id: text,
  name: text,
  category: translatedText,
  description: translatedText,
  technologies,
  url: z.url(),
  details: translatedText,
});

// Relationships between the groups and the catalog are checked separately.
const workSelection = z.object({ featured: z.array(text), supporting: z.array(text) });

const portfolioSchema = z.object({
  name: text,
  location: text,
  emailEncoded: z.base64(),
  github: z.url(),
  linkedin: z.url(),
  portrait: z.object({
    src: text,
    alt: translatedText,
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  fullPortrait: z.object({
    src: text,
    alt: translatedText,
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  identity: translatedText,
  introduction: translatedText,
  interests: z
    .array(z.object({ id: text, title: translatedText, description: translatedText }))
    .min(1),
  coreStrengths: z.array(translatedText).min(1),
  skills: z
    .array(z.object({ id: text, title: translatedText, technologies, description: translatedText }))
    .min(1),
  aiRecommendations: z.object({
    updated: z.iso.date(),
    introduction: translatedText,
    items: z
      .array(
        z.object({
          task: translatedText,
          model: text,
          effort: z.enum(['Low', 'Medium', 'High', 'Extra High', 'Max']),
          note: translatedText,
        }),
      )
      .min(1)
      .max(5),
  }),
  portfolioBuild: z.object({
    introduction: translatedText,
    items: z
      .array(
        z.object({ id: text, topic: translatedText, technologies, description: translatedText }),
      )
      .min(1),
    links: z.array(z.object({ name: text, url: z.url() })),
  }),
  teaching: z.array(teachingTopic).min(1),
  experience: z.array(experience),
  selectedWork: workSelection,
  projects: z.array(project),
});

const validated = portfolioSchema.parse(portfolio);

z.email().parse(globalThis.atob(validated.emailEncoded));

validateSelectedWork(validated.projects, validated.selectedWork);

process.stdout.write(`Validated bilingual content for ${validated.name}.\n`);
