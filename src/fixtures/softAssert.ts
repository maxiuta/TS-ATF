import { test as base } from '@playwright/test';
import { SoftAssert } from '@/utils/SoftAssert';

type SoftAssertFixtures = {
  softAssert: SoftAssert;
};

export const soft = base.extend<SoftAssertFixtures>({
  softAssert: async ({}, use) => {
    const sa = new SoftAssert();
    await use(sa);
  },
});
