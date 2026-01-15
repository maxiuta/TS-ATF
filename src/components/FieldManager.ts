import type { Locator } from '@playwright/test';
import { Button, Input } from './'; // barrel ok

export class FieldManager {
  constructor(private readonly root: Locator) {}

  button(locator: Locator): Button {
    return new Button(locator);
  }

  input(locator: Locator): Input {
    return new Input(locator);
  }
}
