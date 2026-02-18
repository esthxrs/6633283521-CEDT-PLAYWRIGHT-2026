import { test, expect } from '@playwright/test';

test.describe('Login failure', () => {
  test('Login passed with valid credential', async ({ page }) => {
    // test steps here
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('k');

  });

  test.only

});

test('test', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.locator('#menu-toggle').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('k');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('k');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect (page.locator('.lead.text-danger')).toHaveText
});