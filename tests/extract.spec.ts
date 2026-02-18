import { test, expect } from '@playwright/test';

test('Extract value', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  const makeAppointmentTxt = await page
    .getByRole('link', { name: 'Make Appointment' })
    .textContent();

  console.log('Text:', makeAppointmentTxt);
});