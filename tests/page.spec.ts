import { test, expect } from '@playwright/test';

test.describe('Page related commands', () => {

  test('Navigate and click', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    await expect(page).toHaveTitle(/CURA Healthcare/);

    await page.getByRole('link', { name: 'Make Appointment' }).click();

    await expect(page).toHaveURL(/profile\.php#login/);
  });

  test('Locate element using index', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    const links = page.getByRole('link');

    await links.nth(0).click();

    await expect(page).toHaveURL(/profile\.php#login/);
  });

});