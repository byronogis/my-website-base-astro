import { defineCollection, z } from 'astro:content'

const essayCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    //
  }),
})

export const collections = {
  essays: essayCollection,
}
