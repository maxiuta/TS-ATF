import { expect, test as base } from '@playwright/test';
import { DataStore } from '@utils/DataStore';

export const test = base.extend<{
  dataStore: DataStore;
}>({
  dataStore: async ({}, use) => {
    await use(new DataStore());
  },
});

export { expect };
