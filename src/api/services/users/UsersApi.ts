import { ApiClient } from '@api/client/ApiClient';
import {
  CreateUserRequest,
  LoginUserRequest,
} from '@api/services/users/users.types';

export class UsersApi {
  constructor(private readonly apiClient: ApiClient) {}

  async createUser(payload: CreateUserRequest) {
    return await this.apiClient.post('/users', {
      data: payload,
    });
  }

  async loginUser(payload: LoginUserRequest) {
    return await this.apiClient.post('/users/login', {
      data: payload,
    });
  }

  async updateUser(payload: CreateUserRequest) {
    return await this.apiClient.patch('/users/me', {
      data: payload,
    });
  }
}
