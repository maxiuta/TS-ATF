import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { LoginPageSteps } from '@steps/LoginPageSteps';
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
    const ds = new DataStore();
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
});

test.afterEach(async ({ softAssert }) => {
  softAssert.assertAll();
});

export { expect };
