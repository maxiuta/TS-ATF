import { test as base, expect } from '@playwright/test';
import { DataStore } from '@/utils/DataStore';

export type DataStoreFixtures = {
  dataStore: DataStore;
};

export const dataStore = base.extend<DataStoreFixtures>({
  dataStore: async ({}, use) => {
    const store = DataStore.getDataStore();
    store.clear();
    await use(store);
    store.clear();
  },
});

export { expect };
