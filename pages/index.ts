import { ApiRequests } from "./api-requests.page";
import { APIRequestContext } from "@playwright/test";

export class AppSingleton {
  public apiRequests: ApiRequests;

  private static instance: AppSingleton|undefined;

  private constructor(protected request: APIRequestContext) {
    this.apiRequests = new ApiRequests(request);
  }

  public static getInstance(request: APIRequestContext): AppSingleton {
    if (!AppSingleton.instance) {
      AppSingleton.instance = new AppSingleton(request);
    }
    return AppSingleton.instance;
  }

  public static resetInstance(): void {
    AppSingleton.instance = undefined;
  }
}

