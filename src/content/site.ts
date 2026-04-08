// src/content/site.ts
export type SiteNavItem = { 
    label: string;
    href: string 
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;            
  locale: string;
  author: {
    name: string;
    email?: string;
    url?: string;
    socials?: {
      github?: string;
      linkedin?: string;
      scholar?: string;
      dblp?: string;
    };
  };
  nav: SiteNavItem[];
  seo: {
    ogImage?: string;
    robots: string;
    themeColor: string;
  };
};

export const site: SiteConfig = {
  name: "Andrés Goens' Personal Website",
  tagline: "A boring, production-ready Astro starter.",
  description:
    "Astro Baseline is a minimal HTML-first starter with senior defaults: SEO, JSON-LD, a11y basics, and clean structure.",
  url: import.meta.env.SITE_URL ?? "https://goens.org",
  locale: "en",
  author: {
    name: "Andrés Goens",
    email: "andres@goens.org",
    url: "https://goens.org",
    socials: {
      github: "https://github.com/goens/",
      linkedin: "https://www.linkedin.com/in/andres-goens/",
      scholar: "https://scholar.google.com/citations?user=vjVhbJoAAAAJ",
      dblp: "https://www.linkedin.com/in/andres-goens/"
    }
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Legal", href: "/legal" }
  ],
  seo: {
    ogImage: "/images/og/og-default.jpg",
    robots: "index,follow",
    themeColor: "#F6AFA1"
  }
};
