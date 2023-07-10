import { defineCollection, z } from 'astro:content'
// import { SITE_POST_TAGS } from '~/consts'

const basicSchemaObject = {
  title: z.string(),
  description: z
    .string()
    .nullable()
    .transform(val => val ?? 'no description'),
  tags: z
    // .enum(SITE_POST_TAGS)
    .string()
    .array()
    .optional(),
  // Transform string to Date object
  date: z
    .string()
    .or(z.date())
    .transform(val => new Date(val)),
  update: z
    .string()
    .or(z.date())
    .optional()
    .transform(val => val ? new Date(val) : undefined),
  //
  heroImage: z.string().optional(),
  head: z
    .tuple([z.string(), z.record(z.string(), z.string())])
    .array()
    .optional(),
}

const essayCollection = defineCollection({
  schema: z.object({
    ...basicSchemaObject,
  }),
})

const manualCollection = defineCollection({
  schema: z.object({
    ...basicSchemaObject,
  }),
})

export const collections = {
  essay: essayCollection,
  manual: manualCollection,
}
