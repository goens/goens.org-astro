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
  name: "PRS Group @ TU Darmstadt - Andrés Goens",
  tagline: "Programming Reliable Systems @ TU Darmstadt",
  description:
    "Website of the Programming Reliable Systems (PRS) Group at TU Darmstadt, led by <a href=\"/authors/andres-goens\">Andrés Goens.</a>",
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
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Team", href: "/team" },
    { label: "Publications", href: "/publications" },
    { label: "Community", href: "/community" },
    { label: "Contact", href: "/contact" },
  ],
  seo: {
    ogImage: "/images/og/og-default.jpg",
    robots: "index,follow",
    themeColor: "#F6AFA1"
  }
};
