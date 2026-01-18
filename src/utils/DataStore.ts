export class DataStore {
  private static instance: DataStore = new DataStore();

  private data = new Map<string, unknown>();

  static getDataStore(): DataStore {
    return DataStore.instance;
  }

  set(key: string, value: unknown) {
    this.data.set(key, value);
  }

  get<T>(key: string): T {
    return this.data.get(key) as T;
  }

  clear() {
    this.data.clear();
  }
}
