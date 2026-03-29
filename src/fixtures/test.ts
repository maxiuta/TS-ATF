import { test as uiTest, expect } from '@fixtures/ui';
import { ApiClient } from '@api/client/ApiClient';

type ApiFixtures = {
  apiClient: ApiClient;
};

export const test = uiTest.extend<ApiFixtures>({
  apiClient: async ({ playwright, logger }, use) => {
    const requestContext = await playwright.request.newContext({
      baseURL: process.env.BASE_API_URL,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const apiClient = new ApiClient(requestContext, logger);

    await use(apiClient);

    await requestContext.dispose();
  },
});

export { expect };
