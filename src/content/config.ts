import { defineCollection, z } from "astro:content";

const news = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    thumbnail: image().optional(),
  }),
});

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
    bibtex: z.string().optional(),
    pdf: z.string().optional(),
    artifact: z.string().optional(),
    repository: z.string().optional(),
    video: z.string().url().optional(),
  }),
});

const authors = defineCollection({
  type: "data",
  schema: ({ image }) => z.object({
    slug: z.string(),
    name: z.string(),
    papers: z.array(z.string()),
    bio: z.string().optional(),
    picture: image().optional(),
    homepage: z.string().url().optional(),
    team: z.enum(["lead", "admin", "postdoc", "phd", "student"]).optional(),
  }),
});

export const collections = { publications, authors, news };
