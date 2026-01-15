// src/components/Button.ts
import { expect, type Locator } from '@playwright/test';

export class Button {
  constructor(private readonly locator: Locator) {}

  async click() {
    await expect(this.locator).toBeVisible();
    await expect(this.locator).toBeEnabled();
    await this.locator.click();
  }

  async isDisabled() {
    await expect(this.locator).toBeDisabled();
  }

  async isEnabled() {
    await expect(this.locator).toBeEnabled();
  }

  async isVisible() {
    await expect(this.locator).toBeVisible();
  }
}
