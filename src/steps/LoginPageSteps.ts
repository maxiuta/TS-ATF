import { LoginPage } from '@pages/LoginPage';
import { SoftAssert } from '@/utils/SoftAssert';
import { DataStore } from '@/utils/DataStore';
import { BaseStep } from './BaseStep';

export class LoginPageSteps extends BaseStep {
  constructor(
    private readonly loginPage: LoginPage,
    softAssert: SoftAssert,
    dataStore: DataStore,
    logger: { info(msg: string): void; error(msg: string): void },
  ) {
    super(softAssert, dataStore, logger);
  }

  async openLogin(): Promise<void> {
    await this.step('Open login page', async () => {
      await this.loginPage.open();
      await this.loginPage.isAt();
    });
  }

  async login(username: string, password: string): Promise<void> {
    await this.step('Login with credentials', async () => {
      await this.loginPage.fillEmail(username);
      await this.loginPage.fillPassword(password);
      await this.loginPage.submitLogin();
    });
  }

  async loginErrorIsDisplayed(text: string): Promise<void> {
    await this.step('Verify login error message', async () => {
      await this.loginPage.error.waitFor({ state: 'visible' });

      this.softAssert.assertEquals(
        (await this.loginPage.error.textContent()) ?? '',
        text,
      );
    });
  }
}
