import type { Page } from '@playwright/test';

export interface LoadableComponent {
  page: Page;
  isAt(): Promise<boolean>;
}
