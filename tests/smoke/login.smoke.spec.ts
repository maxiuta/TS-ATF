import { test } from '@fixtures/baseTest';
import { createLogger } from '@utils/Logger';
import { dataStore } from '@fixtures/dataStore';
const log = createLogger('UI');

test.beforeEach(async ({ loginPageSteps }) => {
  await loginPageSteps.openLogin();
  const с = 0;
});

test('login shows error', async ({ loginPageSteps }) => {
  await loginPageSteps.login('bad', 'bad');
  await loginPageSteps.loginErrorIsDisplayed('Incorrect username or password');
});
