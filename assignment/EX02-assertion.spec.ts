import { test, expect } from '@playwright/test';
import users from '@test-data/users/valid-user.json';

const baseUrl = 'https://katalon-demo-cura.herokuapp.com/';
const { username: validUsername, password: validPassword } = users[0];

const makeAppointmentLinkText = 'Make Appointment';
const usernameLabel = 'Username';
const passwordLabel = 'Password';
const loginButtonText = 'Login';
const makeAppointmentHeadingText = 'Make Appointment';
const facilitySelectId = '#combo_facility';
const hospitalReadmissionCheckboxId = '#chk_hospotal_readmission';
const healthProgramRadioName = 'Medicare';
const visitDateId = '#txt_visit_date';
const commentId = '#txt_comment';
const bookAppointmentButtonText = 'Book Appointment';
const commentText = 'Test comment';

test.describe('Make Appointment page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('link', { name: makeAppointmentLinkText }).click();
    await page.getByLabel(usernameLabel).fill(validUsername);
    await page.getByLabel(passwordLabel).fill(validPassword);
    await page.getByRole('button', { name: loginButtonText }).click();
  });

  test('Verify that Make Appointment page display "Make Appointment" in h2', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: makeAppointmentHeadingText,
        level: 2,
      }),
    ).toBeVisible();
  });

  test('Verify that can select all facility combo boxes', async ({ page }) => {
    const facilitySelect = page.locator(facilitySelectId);
    await expect(facilitySelect).toBeVisible();
    const optionCount = await facilitySelect.locator('option').count();
    for (let i = 1; i < optionCount; i++) {
      await facilitySelect.selectOption({ index: i });
      await expect(facilitySelect).not.toHaveValue('');
    }
  });

  test('Verify that can select apply for hospital readmission checkbox', async ({ page }) => {
    const checkbox = page.locator(hospitalReadmissionCheckboxId);
    await expect(checkbox).toBeVisible();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('Verify that can select health care program radio button', async ({ page }) => {
    const radio = page.getByRole('radio', { name: healthProgramRadioName });
    await expect(radio).toBeVisible();
    await radio.check();
    await expect(radio).toBeChecked();
  });

  test('Verify that can input current date on Visit Date', async ({ page }) => {
    const visitDate = page.locator(visitDateId);
    await expect(visitDate).toBeVisible();
    const today = new Date().toISOString().slice(0, 10);
    await visitDate.fill(today);
    await expect(visitDate).toHaveValue(today);
  });

  test('Verify that can input comment', async ({ page }) => {
    const comment = page.locator(commentId);
    await expect(comment).toBeVisible();
    await comment.fill(commentText);
    await expect(comment).toHaveValue(commentText);
  });

  test('Verify that Book Appointment button is displayed and enabled', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: bookAppointmentButtonText });
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toBeEnabled();
  });
});