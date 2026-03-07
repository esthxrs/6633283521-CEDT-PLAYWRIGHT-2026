import { test, expect } from '@playwright/test';
import users from '../test-data/users/valid-user.json';

const BASE_URL = 'https://katalon-demo-cura.herokuapp.com/';
const { username: VALID_USERNAME, password: VALID_PASSWORD } = users[0];

test.describe('Make Appointment page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await page.getByLabel('Username').fill(VALID_USERNAME);
    await page.getByLabel('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Verify that Make Appointment page display "Make Appointment" in h2', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Make Appointment', level: 2 })).toBeVisible();
  });

  test('Verify that can select all facility combo boxes', async ({ page }) => {
    const facilitySelect = page.locator('#combo_facility');
    await expect(facilitySelect).toBeVisible();
    const optionCount = await facilitySelect.locator('option').count();
    for (let i = 1; i < optionCount; i++) {
      await facilitySelect.selectOption({ index: i });
      await expect(facilitySelect).not.toHaveValue('');
    }
  });

  test('Verify that can select apply for hospital readmission checkbox', async ({ page }) => {
    const checkbox = page.locator('#chk_hospotal_readmission');
    await expect(checkbox).toBeVisible();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('Verify that can select health care program radio button', async ({ page }) => {
    const radio = page.getByRole('radio', { name: 'Medicare' });
    await expect(radio).toBeVisible();
    await radio.check();
    await expect(radio).toBeChecked();
  });

  test('Verify that can input current date on Visit Date', async ({ page }) => {
    const visitDate = page.locator('#txt_visit_date');
    await expect(visitDate).toBeVisible();
    const today = new Date().toISOString().slice(0, 10);
    await visitDate.fill(today);
    await expect(visitDate).toHaveValue(today);
  });

  test('Verify that can input comment', async ({ page }) => {
    const comment = page.locator('#txt_comment');
    await expect(comment).toBeVisible();
    await comment.fill('Test comment');
    await expect(comment).toHaveValue('Test comment');
  });

  test('Verify that Book Appointment button is displayed and enabled', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: 'Book Appointment' });
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toBeEnabled();
  });
});