import { faker } from '@faker-js/faker';
import { DataStore } from '@utils/DataStore';

export type PersonData = {
  firstName: string;
  lastName: string;
  email: string;
};

export function generatePerson(
  dataStore: DataStore,
  domain?: string,
): PersonData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = domain
    ? faker.internet.email({
        firstName,
        lastName,
        provider: domain.replace('@', ''),
      })
    : faker.internet.email({ firstName, lastName });

  dataStore.set('FIRST_NAME', firstName);
  dataStore.set('LAST_NAME', lastName);
  dataStore.set('EMAIL', email);

  console.log('GENERATED_EMAIL: ' + email);

  return { firstName, lastName, email };
}
