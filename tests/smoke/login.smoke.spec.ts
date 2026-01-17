import { test } from '@fixtures/baseTest';

test.beforeEach(async ({ loginPageSteps }) => {
  await loginPageSteps.openLogin();
});

test('login shows error', async ({ loginPageSteps }) => {
  await loginPageSteps.login('bad', 'bad');
  await loginPageSteps.loginErrorIsDisplayed('Incorrect username or password');
});
