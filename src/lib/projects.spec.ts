import { describe, it, expect } from 'vitest'
import type { Project } from '@/types/project'
import { collectTags, filterByTag, findBySlug, sortByDateDesc } from './projects'

function makeProject(overrides: Partial<Project> & { slug: string }): Project {
  return {
    title: overrides.slug,
    summary: '',
    problem: '',
    approach: '',
    retrospective: '',
    tags: [],
    repoUrl: 'https://example.com',
    date: '2025-10',
    featured: false,
    ...overrides,
  }
}

describe('sortByDateDesc', () => {
  it('returns projects newest first', () => {
    const input = [
      makeProject({ slug: 'old', date: '2024-01' }),
      makeProject({ slug: 'new', date: '2026-01' }),
      makeProject({ slug: 'middle', date: '2025-01' }),
    ]
    const result = sortByDateDesc(input)

    expect(result.map((p) => p.slug)).toEqual(['new', 'middle', 'old'])
  })

  it('does not mutate the input array', () => {
    const input = [
      makeProject({ slug: 'old', date: '2024-01' }),
      makeProject({ slug: 'new', date: '2026-01' }),
    ]

    sortByDateDesc(input)

    expect(input.map((p) => p.slug)).toEqual(['old', 'new'])
  })

  it('breaks date ties by title, alphabetically', () => {
    const items = [
      makeProject({ slug: 'z', title: 'Zebra', date: '2026-06' }),
      makeProject({ slug: 'a', title: 'Aardvark', date: '2026-06' }),
    ]

    expect(sortByDateDesc(items).map((p) => p.slug)).toEqual(['a', 'z'])
  })
})

describe('filterByTag', () => {
  it('returns only projects carrying the tag', () => {
    const items = [
      makeProject({ slug: 'a', tags: ['Vue', 'TypeScript'] }),
      makeProject({ slug: 'b', tags: ['Python'] }),
      makeProject({ slug: 'c', tags: ['TypeScript'] }),
    ]

    expect(filterByTag(items, 'TypeScript').map((p) => p.slug)).toEqual(['a', 'c'])
  })

  it('returns an empty array when nothing matches', () => {
    const items = [makeProject({ slug: 'a', tags: ['Vue'] })]

    expect(filterByTag(items, 'Python').map((p) => p.slug)).toEqual([])
  })
})

describe('collectTags', () => {
  it('dedupes tags across projects', () => {
    const items = [
      makeProject({ slug: 'a', tags: ['Vue', 'TypeScript'] }),
      makeProject({ slug: 'b', tags: ['TypeScript', 'Python'] }),
    ]

    expect(collectTags(items)).toHaveLength(3)
  })

  it('returns tags in alphabetical order', () => {
    const items = [makeProject({ slug: 'a', tags: ['Vue', 'Python', 'React'] })]

    expect(collectTags(items)).toEqual(['Python', 'React', 'Vue'])
  })
})

describe('findBySlug', () => {
  it('finds a project by its slug', () => {
    const items = [makeProject({ slug: 'wanted' }), makeProject({ slug: 'other' })]

    expect(findBySlug(items, 'wanted')?.slug).toBe('wanted')
  })

  it('returns undefined for an unknown slug', () => {
    const items = [makeProject({ slug: 'a' })]

    expect(findBySlug(items, 'nope')).toBeUndefined()
  })
})
