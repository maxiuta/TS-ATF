import { expect, type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

export class LoginPageSteps {
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async openLogin(): Promise<void> {
    await this.loginPage.open();
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginPage.fillUsername(username);
    await this.loginPage.fillPassword(password);
    await this.loginPage.submitLogin();
  }

  async expectError(text: string): Promise<void> {
    await expect(this.loginPage.error).toHaveText(text);
  }
}
