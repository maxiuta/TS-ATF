import { test as base } from '@playwright/test';
import { DataStore } from '@/utils/DataStore';

export type DataStoreFixtures = {
  dataStore: DataStore;
};

export const dataStore = base.extend<DataStoreFixtures>({
  dataStore: async ({}, use) => {
    await use(new DataStore());
  },
});

export { expect } from '@playwright/test';
