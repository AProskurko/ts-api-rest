import { test as baseTest } from "@playwright/test";
import { AppSingleton } from "../singleton/index";

export const test = baseTest.extend<{ app: AppSingleton }>({
  app: async ({ request }, use) => {
    try {
      AppSingleton.resetInstance();
      await use(AppSingleton.getInstance(request));
    } catch (error) {
      console.error("Error in test: ", error);
      throw error;
    }
  },
});
