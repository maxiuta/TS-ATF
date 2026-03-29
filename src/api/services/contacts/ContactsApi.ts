import { ApiClient } from '@api/client/ApiClient';
import type { CreateContactRequest } from '@api/services/contacts/contacts.types';

export class ContactsApi {
  constructor(private readonly apiClient: ApiClient) {}

  async createContact(payload: CreateContactRequest) {
    return await this.apiClient.post('/contacts', {
      data: payload,
    });
  }
}
