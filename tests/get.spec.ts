import { Page, expect, APIRequestContext } from "@playwright/test";
import { test } from "../fixtures/base";
import { ApiRequests } from "../pages/api-requests.page";

test(`Get single user by id`, async ({ request, app }) => {
  let id = 2;

  const response = await app.apiRequests.getUserById(id);

  await expect(response.status()).toBe(200);
});

test(`Get list of users`, async ({ request, app }) => {
  const page = undefined;
  const perPage = undefined;

  const response = await app.apiRequests.getUsersList(page, perPage);
  await expect(response.status()).toBe(200);
});

test(`Get user not found by id`, async ({ request, app }) => {
  let id = 222;

  const response = await app.apiRequests.getUserById(id);
  await expect(response.status()).toBe(404);
});
