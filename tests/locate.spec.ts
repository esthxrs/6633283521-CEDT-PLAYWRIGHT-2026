import { test, expect } from '@playwright/test';

test.describe('Locate element', () => {

  test('Get unique element', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    await page.getByRole('link', {name: "Make Appointment"}).click()

  });

  test('Locate element using index', async ({ page }) => {


  });

  

});