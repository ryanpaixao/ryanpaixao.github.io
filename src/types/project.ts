/**
 * Every technology tag used across portfolio.
 *
 * Adding a project w/new tech means adding it here first.
 * That's deliberate. Stops near-dups like 'Typescript' and 'TypeScript'
 * from becoming 2 seperate filter buttons.
 */

export type ProjectTag =
  | 'Automation'
  | 'Data Processing'
  | 'LLM'
  | 'Local Inference'
  | 'Notion API'
  | 'Printify API'
  | 'Python'
  | 'React'
  | 'TypeScript'
  | 'Vite'
  | 'Vue'

export interface Project {
  slug: string // URL segment used as the route param. Lowercase, hyphenated
  title: string
  summary: string // 1 sentenace for the card view
  problem: string // Issues/struggles/annoyances
  approach: string // interesting technical decisions
  retrospective: string // What I would've done differently
  tags: readonly ProjectTag[]
  repoUrl: string
  liveUrl?: string
  date: string // 'YYYY-MM', sorts correctly as a string, no Date parsing needed
  featured: boolean
}
