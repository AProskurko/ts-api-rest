import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiRequests {
  constructor(private request: APIRequestContext) {}

  async getUserById(id: number): Promise<APIResponse> {
    return this.request.get(`users/${id}`);
  }

  async getUsersList(
    page?: number | undefined,
    perPage?: number | undefined
  ): Promise<APIResponse> {
    switch (true) {
      case page !== undefined && perPage !== undefined:
        return this.request.get(`users?page=${2}&per_page=${3}`);
        break;

      case page !== undefined:
        return this.request.get(`users?page=${2}`);
        break;

      case perPage !== undefined:
        return this.request.get(`users?per_page=${3}`);
        break;

      default:
        return this.request.get(`users`);
    }
  }
}

