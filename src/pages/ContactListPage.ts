import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Table } from '@/components/Table';
import { FieldManager } from '@/components';

export class ContactListPage extends BasePage {
  readonly table = new Table(this.page.locator('[class~="contactTable"]'));
  readonly title: Locator = this.page.locator('h1');
  readonly logoutButton: Locator = this.page.locator('[id="logout"]');
  readonly addNewContactButton: Locator =
    this.page.locator('[id="add-contact"]');

  private fm = new FieldManager(this.page.locator('form'));

  async isAt(): Promise<boolean> {
    await this.page.locator('[class~="contactTable"]').waitFor();
    return this.page.locator('[class~="contactTable"]').isVisible();
  }

  async clickLogoutButton(): Promise<void> {
    await this.fm.button(this.logoutButton).click();
  }

  async clickAddNewContactButton(): Promise<void> {
    await this.fm.button(this.addNewContactButton).click();
  }

  async getContactListTableHeaders(): Promise<string[]> {
    return this.table.getHeadingsAsString();
  }
}
