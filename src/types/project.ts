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
  | 'Vue'
  | 'Vite'

export interface Project {
  slug: string
  title: string
  summary: string
  tags: readonly ProjectTag[]
  problem: string
  approach: string
  retrospective: string
  repoUrl: string
  liveUrl?: string
  date: string
  featured: boolean
}
