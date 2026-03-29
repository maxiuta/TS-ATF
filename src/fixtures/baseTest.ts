import { test as base, expect } from '@playwright/test';
import { SoftAssert } from '@utils/SoftAssert';
import { DataStore } from '@utils/DataStore';
import { createLogger } from '@utils/Logger';

type StepLogger = {
  info(message: string): void;
  error(message: string): void;
};

type BaseFixtures = {
  softAssert: SoftAssert;
  dataStore: DataStore;
  logger: StepLogger;
};

export const baseTest = base.extend<BaseFixtures>({
  softAssert: async ({}, use) => {
    await use(new SoftAssert());
  },

  dataStore: async ({}, use) => {
    await use(new DataStore());
  },

  logger: async ({}, use) => {
    await use(createLogger('TEST'));
  },
});

baseTest.beforeEach(async ({ logger }, testInfo) => {
  logger.info(`===== TEST STARTED: ${testInfo.title} =====`);
});

baseTest.afterEach(async ({ softAssert, logger, dataStore }, testInfo) => {
  softAssert.assertAll();

  const status =
    testInfo.status === testInfo.expectedStatus ? 'PASSED' : 'FAILED';

  logger.info(`===== TEST ${status}: ${testInfo.title} =====`);
  dataStore.clear();
});

export { expect };
