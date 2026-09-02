import type { Project, ProjectTag } from '@/types/project'

export function sortByDateDesc(items: readonly Project[]): Project[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

export function filterByTag(items: readonly Project[], tag: ProjectTag): Project[] {
  return items.filter((p) => p.tags.includes(tag))
}

export function collectTags(items: readonly Project[]): ProjectTag[] {
  return [...new Set(items.flatMap((p) => p.tags))].sort()
}

export function findBySlug(items: readonly Project[], slug: string): Project | undefined {
  return items.find((p) => p.slug === slug)
}
