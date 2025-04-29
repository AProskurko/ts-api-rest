import { APIRequestContext, APIResponse } from "@playwright/test";
import {
  iSingleUserResponse,
  iUsersListResponse,
} from "../types/interfaces/users.interface";

export class ApiRequests {
  private readonly baseHeaders: Record<string, string>;

  constructor(private request: APIRequestContext) {
    this.baseHeaders = { "x-api-key": "reqres-free-v1" };
  }

  async getById(collection: string, id: number): Promise<APIResponse> {
    return await this.request.get(`${collection}/${id}`, {
      headers: this.baseHeaders,
    });
  }

  async getList(
    collection: string,
    page?: number | undefined,
    perPage?: number | undefined
  ): Promise<APIResponse> {
    let path: string;

    switch (true) {
      case page !== undefined && perPage !== undefined:
        path = `${collection}?page=${page}&per_page=${perPage}`;
        break;

      case page !== undefined:
        path = `${collection}?page=${page}`;
        break;

      case perPage !== undefined:
        path = `${collection}?per_page=${perPage}`;
        break;

      default:
        path = `${collection}`;
    }

    return await this.request.get(path, {
      headers: this.baseHeaders,
    });
  }
}


