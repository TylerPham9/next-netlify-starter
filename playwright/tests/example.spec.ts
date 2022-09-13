import { expect, test } from '@playwright/test'

test('Should go to main page', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Lots of Cats/)
})
