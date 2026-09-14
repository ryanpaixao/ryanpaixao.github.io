import { test, expect } from '@playwright/test'

import { projects } from '@/data/projects'

test.describe('home page', () => {
  test('shows the featured projects', async ({ page }) => {
    await page.goto('/')

    const cards = page.getByRole('article')

    await expect(cards).toHaveCount(3)
  })

  test('each featured project links to its detail page', async ({ page }) => {
    await page.goto('/')

    const firstCard = page.getByRole('article').first()

    await expect(firstCard.getByRole('link', { name: 'I Have Notions' })).toHaveAttribute(
      'href',
      /\/project\/i-have-notions/,
    )
  })
})

test('every project links to a real repository', async ({ page }) => {
  await page.goto('/projects')

  const links = page.getByRole('link', { name: /View (source|repository)/i })

  await expect(links).toHaveCount(projects.length)

  const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))
  expect(new Set(hrefs)).toEqual(new Set(projects.map((p) => p.repoUrl)))
})
