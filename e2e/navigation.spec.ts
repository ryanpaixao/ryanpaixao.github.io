import { test, expect } from '@playwright/test'

test('navigates from home to the projects page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Projects' }).click()

  await expect(page).toHaveURL('/projects')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects')
})

test('navigates to the about page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'About' }).click()

  await expect(page).toHaveURL('/about')
})
