import type { Project, ProjectTag } from '@/types/project'

export const projects = [
  {
    slug: 'i-have-notions',
    title: 'I Have Notions',
    summary:
      'A Vue client for the Notion API that turns database pages into a browsable reading view.',
    problem: 'TODO: Fill me in later!!',
    approach: 'TODO: Fill me in later!!',
    retrospective: 'TODO: Fill me in later!!',
    tags: ['Vue', 'TypeScript', 'Notion API'],
    repoUrl: 'https://github.com/ryanpaixao/I-have-notions',
    date: '2025-07',
    featured: true,
  },
  {
    slug: 'productivity-dashboard',
    title: 'Productivity Dashboard',
    summary: 'A React dashboard for tracking daily work and mood, with visualization.',
    problem: 'TODO: Fill me in later!!',
    approach: 'TODO: Fill me in later!!',
    retrospective: 'TODO: Fill me in later!!',
    tags: ['React', 'Vite', 'TypeScript'],
    repoUrl: 'https://github.com/ryanpaixao/productivity-dashboard-frontend',
    date: '2025-05',
    featured: true,
  },
  {
    slug: 'local-deepseek',
    title: 'Local DeepSeek',
    summary: 'Running DeepSeek models locally, with a thin interface loop.',
    problem: 'TODO: REPLACE ME',
    approach: 'TODO: REPLACE ME',
    retrospective: 'TODO: REPLACE ME',
    tags: ['Python', 'LLM', 'Local Inference'],
    repoUrl: 'https://github.com/ryanpaixao/local_deepseek',
    date: '2025-08',
    featured: true,
  },
  {
    slug: 'printify-integration',
    title: 'Printify Integration',
    summary: 'Automating product listing for a print-on-demand storefront.',
    problem: 'TODO: Replace me',
    approach: 'TODO: REPLACE ME',
    retrospective: 'TODO: REPLACE ME',
    tags: ['Python', 'Printify API', 'Automation'],
    repoUrl: 'https://github.com/ryanpaixao/printify-integration',
    date: '2026-06',
    featured: false,
  },
  {
    slug: 'excel-lent-extruder',
    title: 'Excel-lent Extruder',
    summary:
      'Pulls structured data out of messy spreadsheets and normalises it for downstream use.',
    problem: 'TODO: REPLACE ME',
    approach: 'TODO: REPLACE ME',
    retrospective: 'TODO: REPLACE ME',
    tags: ['Python', 'Data Processing'],
    repoUrl: 'https://github.com/ryanpaixao/excel-lent-extruder',
    date: '2026-06',
    featured: false,
  },
] as const satisfies readonly Project[]

// Union of valid slugs, e.g. 'i-have-notions' | 'productivity-dashboard' | ...
export type ProjectSlug = (typeof projects)[number]['slug']

// Newest first (YYYY-MM)
export const projectsByDate: readonly Project[] = [...projects].sort((a, b) =>
  b.date.localeCompare(a.date),
)

export const featuredProjects = projectsByDate.filter((p) => p.featured)

// Every tag in use, deduped and alphabetised. Drives filter UI
export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort()

/**
 * Narrows untrusted string to a ProjectTag. Use this at the boundary --
 * route params and query strings arrive as `string`, and this is the one
 * place a cast is warranted.
 */
export function isProjectTag(value: string): value is ProjectTag {
  return (allTags as readonly string[]).includes(value)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByTag(tag: ProjectTag): readonly Project[] {
  return projectsByDate.filter((p) => p.tags.includes(tag))
}
