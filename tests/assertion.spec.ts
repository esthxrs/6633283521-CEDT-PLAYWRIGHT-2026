import { test, expect } from '@playwright/test';

test.describe('Assertion', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
  });

  test('Check title', async ({ page }) => {
    await expect(page).toHaveTitle(/CURA Healthcare/);
  });

});