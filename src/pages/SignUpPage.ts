import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '@utils/ConfigReader';
import { FieldManager } from '@/components';

export class SignUpPage extends BasePage {
  readonly title: Locator = this.page.locator('h1');
  readonly firstName: Locator = this.page.locator("[id='email']");
  readonly lastName: Locator = this.page.locator("[id='password']");
  readonly email: Locator = this.page.locator("[id='email']");
  readonly password: Locator = this.page.locator("[id='password']");
  readonly submit: Locator = this.page.locator("[id='submit']");
  readonly error: Locator = this.page.locator("[id='error']");

  private fm = new FieldManager(this.page.locator('form'));

  async isAt(): Promise<boolean> {
    return this.submit.isVisible();
  }

  async fillFirstName(value: string): Promise<void> {
    await this.fm.input(this.firstName).fill(value);
  }

  async fillLastName(value: string): Promise<void> {
    await this.fm.input(this.lastName).fill(value);
  }

  async fillEmail(value: string): Promise<void> {
    await this.fm.input(this.email).fill(value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.fm.input(this.password).fill(value);
  }

  async clickSubmit(): Promise<void> {
    await this.fm.button(this.submit).click();
  }
}
