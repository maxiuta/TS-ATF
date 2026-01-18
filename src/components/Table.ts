import { Locator } from '@playwright/test';

export class Table {
  constructor(private readonly root: Locator) {}

  async getHeadingsAsString(): Promise<string[]> {
    await this.root.waitFor({ state: 'visible' });

    const headers = this.root.locator('thead.contactTableHead > tr > th');
    return (await headers.allInnerTexts()).map((t) => t.trim());
  }

  addIndexToDuplicates(headers: string[]): string[] {
    const counter = new Map<string, number>();

    return headers.map((h) => {
      const c = counter.get(h) ?? 0;
      counter.set(h, c + 1);
      return c === 0 ? h : `${h}_${c}`;
    });
  }

  getRows(): Locator {
    return this.root.locator('tbody tr');
  }

  async getRowsMappedToHeadings(): Promise<Map<string, Locator>[]> {
    const headers = await this.getHeadingsAsString();
    const headersNoDup = this.addIndexToDuplicates(headers);

    const rows = this.getRows();
    const rowCount = await rows.count();

    const result: Map<string, Locator>[] = [];

    for (let r = 0; r < rowCount; r++) {
      const row = rows.nth(r);
      const cells = row.locator('td');
      const cellCount = await cells.count();

      const rowMap = new Map<string, Locator>();

      for (let c = 0; c < cellCount; c++) {
        rowMap.set(headersNoDup[c], cells.nth(c));
      }

      result.push(rowMap);
    }

    return result;
  }
}
