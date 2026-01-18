import { test } from '@fixtures/baseTest';

test.beforeEach(async ({ loginPageSteps }) => {
  await loginPageSteps.openLogin();
});

test('Open login page and validate error page', async ({ loginPageSteps }) => {
  await loginPageSteps.login('bad', 'bad');
  await loginPageSteps.validateLoginPageTitle('Contact List App');
  await loginPageSteps.loginErrorIsDisplayed('Incorrect username or password');
});
