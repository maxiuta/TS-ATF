import { expect, type Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

export class LoginPageSteps {
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async openLogin(): Promise<void> {
    await this.loginPage.open();
    await this.loginPage.isAt();
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginPage.fillEmail(username);
    await this.loginPage.fillPassword(password);
    await this.loginPage.submitLogin();
  }

  async loginErrorIsDisplayed(text: string): Promise<void> {
    expect(this.loginPage.error.isVisible).toBe(true);
    await expect(this.loginPage.error).toHaveText(text);
  }
}
