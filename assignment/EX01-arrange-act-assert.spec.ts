import { test, expect } from '@playwright/test';
import users from '../test-data/users/valid-user.json';

const BASE_URL = 'https://katalon-demo-cura.herokuapp.com/';
const { username: VALID_USERNAME, password: VALID_PASSWORD } = users[0];

test.describe('Login', () => {
  test('Verify login pass with valid user', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Make Appointment' }).click();

    await page.getByLabel('Username').fill(VALID_USERNAME);
    await page.getByLabel('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  });

  test('Verify login fail with invalid password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Make Appointment' }).click();

    await page.getByLabel('Username').fill(VALID_USERNAME);
    await page.getByLabel('Password').fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('Verify login fail with invalid username', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Make Appointment' }).click();

    await page.getByLabel('Username').fill('InvalidUser');
    await page.getByLabel('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});