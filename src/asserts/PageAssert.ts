import { expect, type Page } from '@playwright/test';
import type { LoadableComponent } from './LoadableComponent';

type Options = {
  loadState?: Parameters<Page['waitForLoadState']>[0];
  timeoutMs?: number;
  atTimeoutMs?: number;
};

export class PageAssert {
  constructor(private readonly actual: LoadableComponent) {}

  async isLoaded(opts: Options = {}) {
    const {
      loadState = 'load',
      timeoutMs = 30_000,
      atTimeoutMs = 5_000,
    } = opts;

    const page = this.actual.page;

    await page.waitForLoadState(loadState, { timeout: timeoutMs });

    await expect
      .poll(() => this.actual.isAt(), { timeout: atTimeoutMs })
      .toBe(true);

    const ok = await this.actual.isAt();
    if (!ok) {
      throw new Error(
        `Expected page <${this.actual.constructor?.name ?? 'Unknown'}> to be loaded. Actual URL: <${page.url()}>`,
      );
    }
  }
}
