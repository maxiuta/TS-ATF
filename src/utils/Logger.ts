import pino, { type Logger } from 'pino';

const isCI = !!process.env.CI;

export type AppLogger = Logger;

export const createLogger = (scope: string): AppLogger =>
  pino({
    level: process.env.LOG_LEVEL ?? 'info',
    transport: !isCI
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  });