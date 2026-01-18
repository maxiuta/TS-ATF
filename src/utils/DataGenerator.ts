import { DataStore } from '@utils/DataStore';

export type PersonData = {
  firstName: string;
  lastName: string;
  email: string;
};

const FIRST_NAMES = [
  'Jaames',
  'Joahn',
  'Roabert',
  'Miachael',
  'Wialliam',
  'Daavid',
  'Joaseph',
  'Daaniel',
  'Maatthew',
  'Anadrew',
  'Charistopher',
  'Thaomas',
  'Ryaan',
  'Alaex',
  'Maark',
];

const LAST_NAMES = [
  'Smath',
  'Joanson',
  'Brawn',
  'Taalor',
  'Anaerson',
  'Thampson',
  'Whate',
  'Haaris',
  'Maatin',
  'Clark',
  'Leais',
  'Waaker',
  'Haal',
  'Yoang',
  'Kiag',
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
