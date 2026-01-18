import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { LoginPageSteps } from '@steps/LoginPageSteps';
import { SignUpPage } from '@pages/SignUpPage';
import { SignUpPageSteps } from '@steps/SignUpPageSteps';
import { ContactListPage } from '@pages/ContactListPage';
import { ContactListPageSteps } from '@steps/ContactListPageSteps';
import { SoftAssert } from '@/utils/SoftAssert';
import { DataStore } from '@/utils/DataStore';
import { createLogger } from '@utils/Logger';

type StepLogger = {
  info(message: string): void;
  error(message: string): void;
};

type Fixtures = {
  loginPage: LoginPage;
  loginPageSteps: LoginPageSteps;
  signUpPage: SignUpPage;
  signUpPageSteps: SignUpPageSteps;
  contactListPage: ContactListPage;
  contactListPageSteps: ContactListPageSteps;
  softAssert: SoftAssert;
  dataStore: DataStore;
  logger: StepLogger;
};

export const test = base.extend<Fixtures>({
  softAssert: async ({}, use) => {
    const sa = new SoftAssert();
    await use(sa);
  },

  dataStore: async ({}, use) => {
    const ds = DataStore.getDataStore();
    await use(ds);
  },

  logger: async ({}, use) => {
    await use(createLogger('UI'));
  },

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

test.afterEach(async ({ softAssert }) => {
  softAssert.assertAll();
});

test.beforeEach(async ({ logger }, testInfo) => {
  logger.info(`===== TEST STARTED: ${testInfo.title} =====`);
});

test.afterEach(async ({ logger }, testInfo) => {
  const status =
    testInfo.status === testInfo.expectedStatus ? 'PASSED' : 'FAILED';
  logger.info(`===== TEST ${status}: ${testInfo.title} =====`);
});

export { expect };
