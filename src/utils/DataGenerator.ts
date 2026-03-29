import { DataStore } from '@utils/DataStore';

export type PersonData = {
  firstName: string;
  lastName: string;
  email: string;
};

const FIRST_NAMES = [
  'Jaaasmes',
  'Joaashn',
  'Roaasbert',
  'Miaaschael',
  'Wiaaslliam',
  'Daaasvid',
  'Joaasseph',
  'Daaasniel',
  'Maaastthew',
  'Anaasdrew',
  'Chaasristopher',
  'Thaasomas',
  'Ryaasan',
  'Alaasex',
  'Maaasrk',
];

const LAST_NAMES = [
  'Smaasth',
  'Joaasnson',
  'Braaswn',
  'Taaaslor',
  'Anaaserson',
  'Thaasmpson',
  'Whaaste',
  'Haaasris',
  'Maaastin',
  'Claasrk',
  'Leaasis',
  'Waaasker',
  'Haaasl',
  'Yoaasng',
  'Kiaasg',
];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function generatePerson(
  dataStore: DataStore,
  domain = '@example.com',
): PersonData {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const email = firstName.concat(lastName).concat(domain);

  dataStore.set('FIRST_NAME', firstName);
  dataStore.set('LAST_NAME', lastName);
  dataStore.set('EMAIL', email);

  return { firstName, lastName, email };
}
