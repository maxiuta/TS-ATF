import { auth } from '@fixtures/auth';
import { DataStore } from '@utils/DataStore';

auth.beforeEach(async ({ loginPageSteps }) => {
  await loginPageSteps.openLogin();
});

auth('login shows error', async ({ loginPageSteps }) => {
  await loginPageSteps.login('bad', 'bad');
  await loginPageSteps.expectError('Invalid credentials');
});

export async function createUserStep(dataStore: DataStore) {
  dataStore.set('token', 'abc');
}
