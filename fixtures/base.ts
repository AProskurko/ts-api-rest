import { test as baseTest, APIRequestContext } from "@playwright/test";
import { AppSingleton } from "../pages/index";

export const test = baseTest.extend<{ app: AppSingleton }> ({
    app: async ({ request}, use) => {
        AppSingleton.resetInstance();
        await use(AppSingleton.getInstance(request))
    }
})