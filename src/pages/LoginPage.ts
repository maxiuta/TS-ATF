import type { Locator, Page } from '@playwright/test';
import { env } from '@utils/ConfigReader';

export class LoginPage {
  readonly page: Page;

  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit = page.locator('#submit');
    this.error = page.locator('.error');
  }

  async open(): Promise<void> {
    await this.page.goto(env.baseUiUrl);
  }

  async fillUsername(value: string): Promise<void> {
    await this.username.fill(value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.password.fill(value);
  }

  async submitLogin(): Promise<void> {
    await this.submit.click();
  }
}
