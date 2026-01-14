import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { LoginPageSteps } from '@steps/LoginPageSteps';

type Fixtures = {
  loginPage: LoginPage;
  loginPageSteps: LoginPageSteps;
};

export const auth = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loginPageSteps: async ({ page }, use) => {
    await use(new LoginPageSteps(page));
  },
});

export { expect } from '@playwright/test';
