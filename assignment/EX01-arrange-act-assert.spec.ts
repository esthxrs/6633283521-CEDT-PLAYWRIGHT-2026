import { test, expect } from '@playwright/test';
import users from '@test-data/users/valid-user.json';

const baseUrl = 'https://katalon-demo-cura.herokuapp.com/';
const { username: validUsername, password: validPassword } = users[0];

const makeAppointmentLinkText = 'Make Appointment';
const usernameLabel = 'Username';
const passwordLabel = 'Password';
const loginButtonText = 'Login';
const loginHeadingText = 'Login';
const makeAppointmentHeadingText = 'Make Appointment';

test.describe('Login', () => {
  test('Verify login pass with valid user', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('link', { name: makeAppointmentLinkText }).click();

    await page.getByLabel(usernameLabel).fill(validUsername);
    await page.getByLabel(passwordLabel).fill(validPassword);
    await page.getByRole('button', { name: loginButtonText }).click();

    await expect(
      page.getByRole('heading', { name: makeAppointmentHeadingText }),
    ).toBeVisible();
  });

  test('Verify login fail with invalid password', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('link', { name: makeAppointmentLinkText }).click();

    await page.getByLabel(usernameLabel).fill(validUsername);
    await page.getByLabel(passwordLabel).fill('WrongPassword');
    await page.getByRole('button', { name: loginButtonText }).click();

    await expect(
      page.getByRole('heading', { name: loginHeadingText }),
    ).toBeVisible();
  });

  test('Verify login fail with invalid username', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('link', { name: makeAppointmentLinkText }).click();

    await page.getByLabel(usernameLabel).fill('InvalidUser');
    await page.getByLabel(passwordLabel).fill(validPassword);
    await page.getByRole('button', { name: loginButtonText }).click();

    await expect(
      page.getByRole('heading', { name: loginHeadingText }),
    ).toBeVisible();
  });
});