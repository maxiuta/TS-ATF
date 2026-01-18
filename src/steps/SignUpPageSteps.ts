import { SignUpPage } from '@pages/SignUpPage';
import { SoftAssert } from '@utils/SoftAssert';
import { DataStore } from '@utils/DataStore';
import { BaseStep } from './BaseStep';

export class SignUpPageSteps extends BaseStep {
  constructor(
    private readonly signUpPageSteps: SignUpPage,
    softAssert: SoftAssert,
    dataStore: DataStore,
    logger: { info(msg: string): void; error(msg: string): void },
  ) {
    super(softAssert, dataStore, logger);
  }

  async validateSignUpPageIsDisplayed(): Promise<void> {
    await this.step('Sign Up page is displayed', async () => {
      await this.signUpPageSteps.isAt();
    });
  }

  async validateSignUpPageTitle(title: string): Promise<void> {
    await this.step('Sign up page title contains correct title', async () => {
      this.softAssert.assertEquals(
        await this.signUpPageSteps.title.textContent(),
        title,
      );
    });
  }

  async submitSignUpForm(username: string, password: string): Promise<void> {
    await this.step('Submit sign up form with valid data', async () => {
      await this.signUpPageSteps.fillFirstName(password);
      await this.signUpPageSteps.fillLastName(password);
      await this.signUpPageSteps.fillEmail(username);
      await this.signUpPageSteps.fillPassword(password);
      await this.signUpPageSteps.clickSubmit();
    });
  }

  async signUpFormErrorIsDisplayed(text: string): Promise<void> {
    await this.step('Verify sign up form error message', async () => {
      await this.signUpPageSteps.error.waitFor({ state: 'visible' });

      this.softAssert.assertEquals(
        await this.signUpPageSteps.error.textContent(),
        text,
      );
    });
  }
}
