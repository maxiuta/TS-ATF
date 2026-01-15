import { expect, type Locator } from '@playwright/test';

export class Input {
  constructor(private readonly locator: Locator) {}

  async fill(value: string) {
    await expect(this.locator).toBeVisible();
    await this.locator.fill(value);
  }

  async clear() {
    await expect(this.locator).toBeVisible();
    await this.locator.clear();
  }

  async hasValue(value: string) {
    await expect(this.locator).toHaveValue(value);
  }

  async isDisabled() {
    await expect(this.locator).toBeDisabled();
  }

  async isVisible() {
    await expect(this.locator).toBeVisible();
  }
}
