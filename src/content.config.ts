import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false)
  })
});

export const collections = { posts };
