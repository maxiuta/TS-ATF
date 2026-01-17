export class DataStore {
  private readonly map = new Map<string, unknown>();

  set<T>(key: string, value: T): void {
    this.map.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.map.get(key) as T | undefined;
  }

  require<T>(key: string): T {
    if (!this.map.has(key)) {
      throw new Error(`DataStore: missing key "${key}"`);
    }
    return this.map.get(key) as T;
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  delete(key: string): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }
}
