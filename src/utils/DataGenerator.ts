import { DataStore } from '@utils/DataStore';

export type PersonData = {
  firstName: string;
  lastName: string;
  email: string;
};

const FIRST_NAMES = [
  'James',
  'John',
  'Robert',
  'Michael',
  'William',
  'David',
  'Joseph',
  'Daniel',
  'Matthew',
  'Andrew',
  'Christopher',
  'Thomas',
  'Ryan',
  'Alex',
  'Mark',
];

const LAST_NAMES = [
  'Smith',
  'Johnson',
  'Brown',
  'Taylor',
  'Anderson',
  'Thompson',
  'White',
  'Harris',
  'Martin',
  'Clark',
  'Lewis',
  'Walker',
  'Hall',
  'Young',
  'King',
];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function generatePerson(domain = '@example.com'): PersonData {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const email = firstName.concat(lastName).concat(domain);

  DataStore.getDataStore().set('FIRST_NAME', firstName);
  DataStore.getDataStore().set('LAST_NAME', lastName);
  DataStore.getDataStore().set('EMAIL', email);

  return { firstName, lastName, email };
}
