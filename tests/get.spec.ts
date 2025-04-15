import { test, Page, expect, APIRequestContext } from "@playwright/test";

test(`Get single user request by id`, async ({ request }) => {
  const response = await request.get(`users/1`);
  expect(response.status()).toBe(200);
});

test(`Get list of users request by page`, async ({ request }) => {
  const response = await request.get(`users?page=2&per_page=3`);
  expect(response.status()).toBe(200);
});

test(`Get user not found by id`, async ({ request }) => {
  const response = await request.get(`users/222`);
  expect(response.status()).toBe(404);
  console.log("log: "+response.json());
  expect(response.json()).toBe({})
});