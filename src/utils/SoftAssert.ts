import { expect } from '@playwright/test';

type LoggerLike = {
  info: (msg: string) => void;
  error: (msg: string) => void;
};

type Failure = {
  step: string;
  details: string;
  error?: unknown;
};

export class SoftAssert {
  private static readonly ASSERTION_PASSED =
    'Assertion PASSED for step <%s>: %s';
  private static readonly ASSERTION_FAILED = 'Assert FAILED for step <%s>: %s';
  private static readonly DEFAULT_FAILURE_MESSAGE =
    "The actual value doesn't match the expected value";

  private failures: Failure[] = [];
  private currentStep = 'UNDEFINED_STEP';

  constructor(private readonly logger: LoggerLike = console) {}

  setCurrentStep(step: string): void {
    this.currentStep = step || 'UNDEFINED_STEP';
  }

  assertEquals<T>(actual: T, expected: T): void {
    const step = this.currentStep;
    const details = `Expected: <${this.stringify(expected)}>, Actual: <${this.stringify(actual)}>`;
    try {
      expect(actual).toBe(expected);
      this.logInfo(step, details);
    } catch (e) {
      this.logError(step, SoftAssert.DEFAULT_FAILURE_MESSAGE);
      this.pushFailure(step, details, e);
    }
  }

  assertEqualsMsg<T>(message: string, actual: T, expected: T): void {
    const step = this.currentStep;
    const details = `Expected <${message}>: <${this.stringify(expected)}>, Actual: <${this.stringify(actual)}>`;
    try {
      expect(actual).toBe(expected);
      this.logInfo(step, details);
    } catch (e) {
      this.logError(step, SoftAssert.DEFAULT_FAILURE_MESSAGE);
      this.pushFailure(step, details, e);
    }
  }

  assertTrue(condition: boolean, element: string): void {
    const step = this.currentStep;
    if (condition) {
      this.logInfo(step, `Condition is true for <${element}> element`);
      return;
    }

    const details = `Expected true, but was false for <${element}> element`;
    this.logError(step, details);
    this.pushFailure(step, details);
  }

  assertFalse(condition: boolean, element: string): void {
    const step = this.currentStep;
    if (!condition) {
      this.logInfo(step, `Condition is false for <${element}> element`);
      return;
    }

    const details = `Expected false, but was true for <${element}> element`;
    this.logError(step, details);
    this.pushFailure(step, details);
  }

  assertNull(actual: unknown, element: string): void {
    const step = this.currentStep;
    if (actual == null) {
      this.logInfo(step, `Expected null for <${element}> element`);
      return;
    }

    const details = `Expected null but found <${this.stringify(actual)}> for <${element}> element`;
    this.logError(step, details);
    this.pushFailure(step, details);
  }

  assertNotNull(actual: unknown, element: string): void {
    const step = this.currentStep;
    if (actual != null) {
      this.logInfo(
        step,
        `Expected non-null and found <${this.stringify(actual)}> for <${element}> element`,
      );
      return;
    }

    const details = `Expected non-null but found null for <${element}> element`;
    this.logError(step, details);
    this.pushFailure(step, details);
  }

  assertContains<T>(list: T[], element: T): void {
    const step = this.currentStep;
    if (list.includes(element)) {
      this.logInfo(step, `List contains <${this.stringify(element)}> element`);
      return;
    }

    const details = `Expected list to contain <${this.stringify(element)}>`;
    this.logError(
      step,
      `List does not contain <${this.stringify(element)}> element`,
    );
    this.pushFailure(step, details);
  }

  assertDoesNotContain<T>(list: T[], element: T): void {
    const step = this.currentStep;
    if (!list.includes(element)) {
      this.logInfo(
        step,
        `List does not contain <${this.stringify(element)}> element`,
      );
      return;
    }

    const details = `Expected list not to contain <${this.stringify(element)}>`;
    this.logError(step, `List contains <${this.stringify(element)}> element`);
    this.pushFailure(step, details);
  }

  async check(
    title: string,
    fn: () => unknown | Promise<unknown>,
  ): Promise<void> {
    const step = this.currentStep;
    try {
      await fn();
      this.logInfo(step, title);
    } catch (e) {
      this.logError(step, title);
      this.pushFailure(step, title, e);
    }
  }

  assertAll(): void {
    try {
      if (!this.failures.length) return;

      const msg =
        'SoftAssert failures:\n' +
        this.failures
          .map((f, i) => {
            const err =
              f.error instanceof Error
                ? (f.error.stack ?? f.error.message)
                : f.error
                  ? String(f.error)
                  : '';
            return `${i + 1}) step=<${f.step}> | ${f.details}${err ? `\n${err}` : ''}`;
          })
          .join('\n\n');

      throw new Error(msg);
    } finally {
      this.failures = [];
      this.currentStep = 'UNDEFINED_STEP';
    }
  }

  hasFailures(): boolean {
    return this.failures.length > 0;
  }

  private format(template: string, step: string, details: string): string {
    return template.replace('%s', step).replace('%s', details);
  }

  private logInfo(step: string, details: string): void {
    this.logger.info(this.format(SoftAssert.ASSERTION_PASSED, step, details));
  }

  private logError(step: string, details: string): void {
    const msg = this.format(SoftAssert.ASSERTION_FAILED, step, details);
    this.logger.error(`\u001B[31m${msg}\u001B[0m`);
  }

  private pushFailure(step: string, details: string, error?: unknown): void {
    this.failures.push({ step, details, error });
  }

  private stringify(v: unknown): string {
    if (typeof v === 'string') return v;
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
}
