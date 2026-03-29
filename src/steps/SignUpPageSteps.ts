import { SignUpPage } from '@pages/SignUpPage';
import { SoftAssert } from '@utils/SoftAssert';
import { DataStore } from '@utils/DataStore';
import { BaseStep } from './BaseStep';
import { generatePerson } from '@utils/DataGenerator';
import { LoginPage } from '@pages/LoginPage';

export class SignUpPageSteps extends BaseStep {
  constructor(
    private readonly signUpPage: SignUpPage,
    private readonly loginPage: LoginPage,
    softAssert: SoftAssert,
    dataStore: DataStore,
    logger: { info(msg: string): void; error(msg: string): void },
  ) {
    super(softAssert, dataStore, logger);
  }

  async openSignUpPage(): Promise<void> {
    await this.step('Open Sign Up page', async () => {
      await this.loginPage.clickSignUpButton();
    });
  }

  async validateSignUpPageIsDisplayed(): Promise<void> {
    await this.step('Sign Up page is displayed', async () => {
      await this.signUpPage.isAt();
    });
  }

  async validateSignUpPageTitle(title: string): Promise<void> {
    await this.step('Sign up page title contains correct title', async () => {
      this.softAssert.assertEquals(
        await this.signUpPage.title.textContent(),
        title,
      );
    });
  }

  async submitSignUpForm(): Promise<void> {
    await this.step('Submit sign up form with valid data', async () => {
      generatePerson(this.dataStore);
      await this.signUpPage.fillFirstName(this.dataStore.get('FIRST_NAME'));
      await this.signUpPage.fillLastName(this.dataStore.get('LAST_NAME'));
      await this.signUpPage.fillEmail(this.dataStore.get('EMAIL'));
      await this.signUpPage.fillPassword('Password1!');
      await this.signUpPage.clickSubmit();
    });
  }

  async validateSignUpFormError(text: string): Promise<void> {
    await this.step(
      'Verify sign up form error message is displayed',
      async () => {
        await this.signUpPage.clickSubmit();

        await this.signUpPage.error.waitFor({ state: 'visible' });

        this.softAssert.assertEquals(
          await this.signUpPage.error.textContent(),
          text,
        );
      },
    );
  }
}