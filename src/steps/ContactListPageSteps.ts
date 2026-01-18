import { SoftAssert } from '@utils/SoftAssert';
import { DataStore } from '@utils/DataStore';
import { BaseStep } from './BaseStep';
import { ContactListPage } from '@pages/ContactListPage';

export class ContactListPageSteps extends BaseStep {
  constructor(
    private readonly contactListPage: ContactListPage,
    softAssert: SoftAssert,
    dataStore: DataStore,
    logger: { info(msg: string): void; error(msg: string): void },
  ) {
    super(softAssert, dataStore, logger);
  }

  async validateContactListPageIsDisplayed(): Promise<void> {
    await this.step('Contact List page is displayed', async () => {
      await this.contactListPage.isAt();
    });
  }

  async validateContactListPageTitle(title: string): Promise<void> {
    await this.step(
      'Contact List page title contains correct title',
      async () => {
        this.softAssert.assertEquals(
          await this.contactListPage.title.textContent(),
          title,
        );
      },
    );
  }

  async validateTableHeaders(expectedHeaders: string[]): Promise<void> {
    await this.step('Verify contact list table headers', async () => {
      const actualHeaders =
        await this.contactListPage.getContactListTableHeaders();

      this.softAssert.assertEquals(actualHeaders, expectedHeaders);
    });
  }
}
