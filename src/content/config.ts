import { defineCollection, z } from "astro:content";

const publications = defineCollection({
  type: "data",
  schema: z.object({
    key: z.string(),
    title: z.string(),
    authors: z.array(
      z.object({
        name: z.string(),
        slug: z.string(),
      })
    ),
    abstract: z.string(),
    doi: z.string(),
    url: z.string(),
    year: z.number(),
    venue: z.string(),
    type: z.string(),
  }),
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    papers: z.array(z.string()),
  }),
});

export const collections = { publications, authors };
