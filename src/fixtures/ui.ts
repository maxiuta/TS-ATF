import { baseTest, expect } from '@fixtures/baseTest';
import { LoginPage } from '@pages/LoginPage';
import { LoginPageSteps } from '@steps/LoginPageSteps';
import { SignUpPage } from '@pages/SignUpPage';
import { SignUpPageSteps } from '@steps/SignUpPageSteps';
import { ContactListPage } from '@pages/ContactListPage';
import { ContactListPageSteps } from '@steps/ContactListPageSteps';

type UiFixtures = {
  loginPage: LoginPage;
  loginPageSteps: LoginPageSteps;
  signUpPage: SignUpPage;
  signUpPageSteps: SignUpPageSteps;
  contactListPage: ContactListPage;
  contactListPageSteps: ContactListPageSteps;
};

export const test = baseTest.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loginPageSteps: async ({ loginPage, softAssert, dataStore, logger }, use) => {
    await use(new LoginPageSteps(loginPage, softAssert, dataStore, logger));
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

  signUpPageSteps: async (
    { signUpPage, loginPage, softAssert, dataStore, logger },
    use,
  ) => {
    await use(
      new SignUpPageSteps(signUpPage, loginPage, softAssert, dataStore, logger),
    );
  },

  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },

  contactListPageSteps: async (
    { contactListPage, softAssert, dataStore, logger },
    use,
  ) => {
    await use(
      new ContactListPageSteps(contactListPage, softAssert, dataStore, logger),
    );
  },
});

export { expect };
