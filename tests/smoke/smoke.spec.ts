import { test } from '@fixtures/baseTest';
import { DataStore } from '@utils/DataStore';

test.beforeEach(async ({ loginPageSteps }) => {
  await loginPageSteps.openLogin();
});

test('Open login page and validate error page', async ({ loginPageSteps }) => {
  await loginPageSteps.login('bad', 'bad');
  await loginPageSteps.validateLoginPageTitle('Contact List App');
  await loginPageSteps.loginErrorIsDisplayed('Incorrect username or password');
});

test('Pass registration with valid data', async ({ signUpPageSteps }) => {
  await signUpPageSteps.openSignUpPage();
  await signUpPageSteps.validateSignUpPageTitle('Add User');
  await signUpPageSteps.validateSignUpPageIsDisplayed();
  await signUpPageSteps.validateSignUpFormError(
    'User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.',
  );
  await signUpPageSteps.submitSignUpForm();
});

test('Validate Contact List table headers', async ({
  contactListPageSteps,
  signUpPageSteps,
  loginPageSteps,
}) => {
  await signUpPageSteps.openSignUpPage();
  await signUpPageSteps.validateSignUpPageIsDisplayed();
  await signUpPageSteps.submitSignUpForm();

  await loginPageSteps.openLogin();
  await loginPageSteps.login(
    DataStore.getDataStore().get('EMAIL'),
    'Password1!',
  );

  await contactListPageSteps.validateContactListPageIsDisplayed();
  await contactListPageSteps.validateContactListPageTitle('Contact List');
  const expectedHeaders = [
    'Name',
    'Birthdate',
    'Email',
    'Phone',
    'Address',
    'City, State/Province, Postal Code',
    'Country',
  ];

  await contactListPageSteps.validateTableHeaders(expectedHeaders);
});
