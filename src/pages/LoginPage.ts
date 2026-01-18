import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@utils/ConfigReader';
import { FieldManager } from '@/components';

export class LoginPage extends BasePage {
  readonly title: Locator = this.page.locator('h1');
  readonly email: Locator = this.page.locator("[id='email']");
  readonly password: Locator = this.page.locator("[id='password']");
  readonly submit: Locator = this.page.locator("[id='submit']");
  readonly error: Locator = this.page.locator("[id='error']");
  readonly signUp: Locator = this.page.locator("[id='signup']");
  private fm = new FieldManager(this.page.locator('form'));

  async isAt(): Promise<boolean> {
    return this.signUp.isVisible();
  }

  async open(): Promise<void> {
    await this.page.goto(env.baseUiUrl);
  }

  async fillEmail(value: string): Promise<void> {
    await this.fm.input(this.email).fill(value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.fm.input(this.password).fill(value);
  }

  async submitLogin(): Promise<void> {
    await this.fm.button(this.submit).click();
  }

  async clickSignUpButton(): Promise<void> {
    await this.fm.button(this.signUp).click();
  }
}
