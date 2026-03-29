import { APIRequestContext, APIResponse } from '@playwright/test';

type Logger = {
  info(message: string): void;
  error(message: string): void;
};

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly logger: Logger,
  ) {}

  async get(
    url: string,
    options?: Parameters<APIRequestContext['get']>[1],
  ): Promise<APIResponse> {
    this.logger.info(`[API] GET ${url}`);
    return await this.request.get(url, options);
  }

  async post(
    url: string,
    options?: Parameters<APIRequestContext['post']>[1],
  ): Promise<APIResponse> {
    this.logger.info(`[API] POST ${url}`);
    return await this.request.post(url, options);
  }

  async put(
    url: string,
    options?: Parameters<APIRequestContext['put']>[1],
  ): Promise<APIResponse> {
    this.logger.info(`[API] PUT ${url}`);
    return await this.request.put(url, options);
  }

  async patch(
    url: string,
    options?: Parameters<APIRequestContext['patch']>[1],
  ): Promise<APIResponse> {
    this.logger.info(`[API] PATCH ${url}`);
    return await this.request.patch(url, options);
  }

  async delete(
    url: string,
    options?: Parameters<APIRequestContext['delete']>[1],
  ): Promise<APIResponse> {
    this.logger.info(`[API] DELETE ${url}`);
    return await this.request.delete(url, options);
  }
}
