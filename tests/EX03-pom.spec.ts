import { test, expect, type Page } from '@playwright/test';
import users from '@test-data/users/valid-user.json';

const baseUrl = process.env.CURA_BASE_URL || 'https://katalon-demo-cura.herokuapp.com/';

const makeAppointmentLinkText = 'Make Appointment';
const usernameLabel = 'Username';
const passwordLabel = 'Password';
const loginButtonText = 'Login';
const makeAppointmentHeadingText = 'Make Appointment';

const { username: validUsername, password: validPassword } = users[0];

class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto(baseUrl);
  }

  async goToLogin() {
    await this.page.getByRole('link', { name: makeAppointmentLinkText }).click();
  }
}

class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    await this.page.getByLabel(usernameLabel).fill(username);
    await this.page.getByLabel(passwordLabel).fill(password);
    await this.page.getByRole('button', { name: loginButtonText }).click();
  }
}

class AppointmentPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: makeAppointmentHeadingText });
  }
}

test.describe('Make appointment with Page Object Model', () => {
  test('Make appointment success with valid user', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await homePage.open();
    await homePage.goToLogin();
    await loginPage.login(validUsername, validPassword);

    await expect(appointmentPage.heading).toBeVisible();
  });
});

