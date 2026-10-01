import { Effect } from 'effect';
import { z } from 'zod';

import { portfolio } from '../src/content/portfolio.ts';

const text = z.string().min(1);
const technologies = z.array(text).min(1);
const translatedText = z.object({ en: text, de: text });
const teachingTopic = translatedText.extend({ technologies });
const experience = z.object({ organization: text, period: text, role: translatedText });
const project = z.object({ name: text, description: translatedText, technologies });

const portfolioSchema = z.object({
  name: text,
  location: text,
  email: z.email(),
  github: z.url(),
  linkedin: z.url(),
  teaching: z.array(teachingTopic).min(1),
  experience: z.array(experience),
  projects: z.array(project),
});

const validation = Effect.try({
  try: () => portfolioSchema.parse(portfolio),
  catch: (error) => new Error(`Portfolio content is invalid: ${String(error)}`),
});

const validated = Effect.runSync(validation);
process.stdout.write(`Validated bilingual content for ${validated.name}.\n`);
