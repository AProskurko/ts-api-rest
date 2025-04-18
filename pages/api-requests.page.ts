import { APIRequestContext, APIResponse } from "@playwright/test";
import {
  iSingleUserResponse,
  iUsersListResponse,
} from "../types/interfaces/users.interface";

export class ApiRequests {
  constructor(private request: APIRequestContext) {}

  async getUserById(id: number): Promise<{
    status: number;
    body: iSingleUserResponse;
  }> {
    const response = await this.request.get(`users/${id}`);
    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  async getUsersList(
    page?: number | undefined,
    perPage?: number | undefined
  ): Promise<{
    status: number;
    body: iUsersListResponse;
  }> {
    let response: APIResponse;

    switch (true) {
      case page !== undefined && perPage !== undefined:
        response = await this.request.get(
          `users?page=${page}&per_page=${perPage}`
        );
        break;

      case page !== undefined:
        response = await this.request.get(`users?page=${page}`);
        break;

      case perPage !== undefined:
        response = await this.request.get(`users?per_page=${perPage}`);
        break;

      default:
        response = await this.request.get(`users`);
    }

    const bodyData: iUsersListResponse = await response.json();

    return { status: response.status(), body: bodyData };
  }

  async getResourceById(id: number): Promise<APIResponse> {
    return await this.request.get(`unknown/${id}`);
  }
}

