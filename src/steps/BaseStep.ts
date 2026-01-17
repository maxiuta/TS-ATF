import { SoftAssert } from '@/utils/SoftAssert';
import { DataStore } from '@/utils/DataStore';

type StepLogger = {
  info(message: string): void;
  error(message: string): void;
};

export abstract class BaseStep {
  protected constructor(
    protected readonly softAssert: SoftAssert,
    protected readonly dataStore: DataStore,
    protected readonly log: StepLogger,
  ) {}

  protected async step<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.softAssert.setCurrentStep(name.toUpperCase());

    this.log.info(`[STEP_STARTED]: ${name}`);
    try {
      const result = await fn();
      this.log.info(`[STEP_FINISHED]: ${name}`);
      return result;
    } catch (e) {
      this.log.error(`[STEP_FAILED]: ${name}`);
      throw e;
    }
  }
}
