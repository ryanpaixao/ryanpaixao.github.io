import { test, expect } from '@playwright/test'

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
