import { test as base, expect } from '@playwright/test';
import pino, { type Logger as PinoLogger } from 'pino';

export type Logger = PinoLogger;

export const test = base.extend<{ logger: Logger }>({
  logger: async ({}, use) => {
    const logger: Logger = pino({ level: 'info' });
    await use(logger);
  },
});

export { expect };
