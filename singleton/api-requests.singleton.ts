import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiRequests {
  private readonly baseHeaders: Record<string, string>;

  constructor(private request: APIRequestContext) {
    this.baseHeaders = { "x-api-key": "reqres-free-v1" };
  }

  /*
   * @description: error handler for APi requests
   */
  private async errorHandler<T>(method: () => Promise<T>): Promise<T> {
    try {
      return await method();
    } catch (error) {
      console.error("Error in API request: ", error);
      throw error;
    }
  }

  /*
   * @description: get method for single user and resource
   */
  async getById(collection: string, id: number): Promise<APIResponse> {
    return this.errorHandler(() =>
      this.request.get(`${collection}/${id}`, {
        headers: this.baseHeaders,
      })
    );
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

    return this.errorHandler(() =>
      this.request.get(path, {
        headers: this.baseHeaders,
      })
    );
  }

  async post(
    collection: string,
    name: string,
    job: string
  ): Promise<APIResponse> {
    return this.errorHandler(() =>
      this.request.post(`${collection}`, {
        headers: this.baseHeaders,
        data: {
          name: name,
          job: job,
        },
      })
    );
  }
}
