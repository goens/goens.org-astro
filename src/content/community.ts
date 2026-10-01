export type CommitteeLink = {
  label: string;
  url: string;
};

export type CommitteeYear = {
  year: string;
  note?: string;
  links: CommitteeLink[];
};

export type CommitteeCategory = "pc" | "aec";

export type CommitteeEntry = {
  category: CommitteeCategory;
  role?: string; // optional qualifier within category, e.g. "(Co-)Chair" vs "Committee"
  venue: string;
  venueShort?: string;
  location?: string;
  years: CommitteeYear[];
};

export const committees: CommitteeEntry[] = [
  // Program Committees
  {
    category: "pc",
    venue: "Object-oriented Programming, Systems, Languages, and Applications",
    venueShort: "OOPSLA",
    location: "(part of SPLASH)",
    years: [
      { year: "2027", links: [{ label: "Conference", url: "https://2027.splashcon.org/" }] },
    ],
  },
  {
    category: "pc",
    venue: "Workshop on Programming Languages and Operating Systems ",
    venueShort: "PLOS",
    location: "at SOSP",
    years: [
      { year: "2026", links: [{ label: "Workshop", url: "https://www.plos-workshop.org/2026/organizers.php" }] },
    ],
  },
{
    category: "pc",
    venue: "International Conference on Embedded Software",
    venueShort: "EMSOFT",
    location: "at Embedded Systems Week",
    years: [
      { year: "2025", links: [{ label: "Committee", url: "https://2025.esweek.org/emsoft-program-committee/" }] },
      { year: "2026", links: [{ label: "Committee", url: "https://esweek.org/emsoft-program-committee/" }] },
    ],
  },
{
    category: "pc",
    venue: "SIGPLAN-SIGACT Symposium on Principles of Programming Languages",
    venueShort: "POPL",
    years: [
      { year: "2027", links: [{ label: "Committee", url: "https://popl27.sigplan.org/committee/POPL-2027-popl-research-papers-program-committee" }] },
    ],
  },
{
    category: "pc",
    venue: "SIGPLAN Conference on Programming Language Design and Implementation",
    venueShort: "PLDI",
    years: [
      { year: "2024", note: "SRC", links: [{ label: "Committee", url: "https://pldi24.sigplan.org/committee/pldi-2024-src-organizing-committee" }] },
      { year: "2025", links: [{ label: "Committee", url: "https://pldi25.sigplan.org/committee/pldi-2025-papers-pldi-review-committee" }] },
      { year: "2026", links: [{ label: "Committee", url: "https://pldi26.sigplan.org/committee/pldi-2026-papers-pldi-review-committee" }] },
    ],
  },
  {
    category: "pc",
    venue: "ACM SIGPLAN/SIGBED International Conference on Languages, Compilers, and Tools for Embedded Systems",
    venueShort: "LCTES",
    years: [
      { year: "2026", links: [{ label: "Committee", url: "https://pldi26.sigplan.org/committee/LCTES-2026-main-program-committee" }] },
    ],
  },
  {
    category: "pc",
    venue: "International Conference on Compilers, Architectures, and Synthesis for Embedded Systems",
    venueShort: "CASES",
    location: "at Embedded Systems Week",
    years: [
      { year: "2024", links: [{ label: "Committee", url: "https://2024.esweek.org/cases-program-committee/" }] },
    ],
  },
  {
    category: "pc",
    venue: "International Conference on Parallel Architecture and Compilation Techniques",
    venueShort: "PACT",
    years: [
      { year: "2024", note: "SRC", links: [{ label: "SRC", url: "https://pact2024.github.io/src/" }] },
    ],
  },
  {
    category: "pc",
    venue: "Workshop on Languages, Tools, and Techniques for Accelerator Design",
    venueShort: "LATTE",
    location: "at ASPLOS",
    years: [
      { year: "2025", links: [{ label: "Workshop", url: "https://capra.cs.cornell.edu/latte25/" }] },
    ],
  },
  {
    category: "pc",
    venue: "Workshop on Time-Centric Reactive Software",
    location: "at CPS-IoT Week / ESWEEK",
    years: [
      { year: "2023", links: [{ label: "Committee", url: "https://www.tcrs.io/2023/org/" }] },
      { year: "2024", links: [{ label: "Committee", url: "https://www.tcrs.io/2024/org/" }] },
    ],
  },
  {
    category: "pc",
    venue: "Workshop on Compilers, Deployment, and Tooling for Edge AI",
    venueShort: "CODAI",
    location: "at Embedded Systems Week",
    years: [
      { year: "2023", links: [{ label: "Workshop", url: "https://lamchob.github.io/CODAI/archive/2023/" }] },
    ],
  },
  {
    category: "pc",
    venue: "Workshop on Parallel Programming and Run-Time Management Techniques for Many-core Architectures and Design Tools and Architectures for Multicore Embedded Computing Platforms",
    venueShort: "PARMA-DITAM",
    location: "at HiPEAC",
    years: [
      { year: "2019", links: [{ label: "Workshop", url: "http://conferences.microlab.ntua.gr/ditam-parma2019/" } ] },
      { year: "2021", links: [{ label: "Workshop", url: "https://parma-ditam-workshop.github.io/2021/index.html" }] },
      { year: "2022", links: [{ label: "Workshop", url: "https://parma-ditam-workshop.github.io/2022/" }] },
      { year: "2023", links: [{ label: "Workshop", url: "https://parma-ditam-workshop.github.io/2023/" }] },
      { year: "2024", links: [{ label: "Workshop", url: "https://parma-ditam-workshop.github.io/2024/index.html" }] },
    ],
  },
  {
    category: "pc",
    venue: "Embedded World Conference",
    years: [
      { year: "2021", links: [{ label: "Conference", url: "https://www.embedded-world.de/de-de" }] },
    ],
  },

  // Artifact Evaluation
  {
    category: "aec",
    role: "(Co-)Chair",
    venue: "International Symposium on Computer Architecture",
    venueShort: "ISCA",
    years: [
      { year: "2025", links: [{ label: "Committee", url: "https://www.iscaconf.org/isca2025/committees/org.php" }] },
    ],
  },
  {
    category: "aec",
    role: "(Co-)Chair",
    venue: "International Symposium on Code Generation and Optimization",
    venueShort: "CGO",
    years: [
      { year: "2024", links: [{ label: "Committee", url: "https://conf.researchr.org/committee/cgo-2024/cgo-2024-artifact-evaluation-artifact-evaluation-committee" }] },
      { year: "2025", links: [{ label: "Committee", url: "https://2025.cgo.org/committee/cgo-2025-artifact-evaluation-artifact-evaluation-committee" }] },
    ],
  },
  {
    category: "aec",
    role: "(Co-)Chair",
    venue: "International Conference on Compilers, Architectures, and Synthesis for Embedded Systems",
    venueShort: "CASES",
    location: "at Embedded Systems Week",
    years: [
      { year: "2025", links: [{ label: "Conference", url: "https://2025.esweek.org/cases/" }] },
    ],
  },
  {
    category: "aec",
    venue: "International Conference on Functional Programming",
    venueShort: "ICFP",
    years: [
      { year: "2022", links: [{ label: "Committee", url: "https://icfp22.sigplan.org/committee/icfp-2022-artifact-evaluation-evaluators" }] },
      { year: "2023", links: [{ label: "Committee", url: "https://icfp23.sigplan.org/committee/icfp-2023-artifact-evaluation-artifact-evaluation-committee" }] },
    ],
  },
];
