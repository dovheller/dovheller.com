import { defineCollection, z } from 'astro:content';

const text = z.string().trim().min(1).refine(value => !value.includes('[חסר]'), 'Missing content marker');
const schema = z.object({
  title: text,
  description: text,
  language: z.enum(['he', 'en']),
  order: z.number().int().positive(),
  url: z.string().url().optional()
}).strict();

export const collections = {
  capabilities: defineCollection({ type: 'content', schema }),
  proofs: defineCollection({ type: 'content', schema }),
  pages: defineCollection({ type: 'content', schema })
};
