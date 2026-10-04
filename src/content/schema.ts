import { z } from 'zod';

// The one declaration of the Content shape. The page imports only its type, so
// Zod stays out of the browser bundle; the content check runs the schema itself.
// Strict objects reject misspelled keys instead of silently dropping them.

const text = z.string().min(1);

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u, 'Use a lowercase kebab-case ID.');

const technologies = z.array(text).min(1);

const translatedText = z.strictObject({ en: text, de: text });

const link = z.strictObject({ name: text, url: z.url() });

const image = z.strictObject({
  src: text,
  alt: translatedText,
  width: z.number().positive(),
  height: z.number().positive(),
});

const year = z.int().min(1900);

const project = z.strictObject({
  id,
  name: text,
  category: translatedText,
  description: translatedText,
  technologies,
  url: z.url(),
  details: translatedText,
});

const contentSchema = z.strictObject({
  name: text,
  location: translatedText,
  emailEncoded: z.base64(),
  github: z.url(),
  linkedin: z.url(),
  portrait: image,
  fullPortrait: image,
  identity: translatedText,
  introduction: translatedText,
  interests: z
    .array(z.strictObject({ id, title: translatedText, description: translatedText }))
    .min(1),
  coreStrengths: z.array(z.strictObject({ id, name: translatedText })).min(1),
  technologyNames: z.record(text, translatedText),
  skills: z
    .array(z.strictObject({ id, title: translatedText, technologies, description: translatedText }))
    .min(1),
  aiRecommendations: z.strictObject({
    updated: z.iso.date(),
    items: z
      .array(
        z.strictObject({
          id,
          task: translatedText,
          model: text,
          effort: z.enum(['Low', 'Medium', 'High', 'Extra High', 'Max']),
          note: translatedText,
        }),
      )
      .min(1)
      .max(5),
    modelNotes: z.array(z.strictObject({ model: text, note: translatedText })).min(1),
    tips: z
      .array(
        z.strictObject({
          id,
          title: translatedText,
          description: translatedText,
          links: z.array(link).min(1),
        }),
      )
      .min(1),
  }),
  portfolioBuild: z.strictObject({
    items: z
      .array(
        z.strictObject({ id, topic: translatedText, technologies, description: translatedText }),
      )
      .min(1),
    links: z.array(link),
  }),
  teaching: z.array(z.strictObject({ id, topic: translatedText, technologies })).min(1),
  experience: z.array(
    z.strictObject({
      id,
      organization: translatedText,
      url: z.url(),
      // A missing end year marks the Current role.
      period: z.strictObject({ from: year, to: year.nullable() }),
      role: translatedText,
      description: translatedText,
    }),
  ),
  // Relationships to the catalog are checked in validate.ts.
  selectedWork: z.strictObject({ featured: z.array(id), supporting: z.array(id) }),
  projects: z.array(project),
});

type Content = z.infer<typeof contentSchema>;

export { contentSchema };

export type { Content };
