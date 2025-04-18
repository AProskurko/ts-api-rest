import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import  * as expectedData from "./test-data/expectedResponseData";
// import { UserBodyType } from "../arktypes/user.arktype";

test(`Get single user by id`, async ({ app }) => {
  const userId: number = 2;
  const userEmail: string = "janet.weaver@reqres.in";
  const userAvatar: string = "https://reqres.in/img/faces/2-image.jpg";

  const apiResponse = await app.apiRequests.getUserById(userId);
  expect(apiResponse.status).toBe(200);
  // const responseBody: UserBodyType = apiResponse.body
  // expect(responseBody).toBe(true)
  // const isValid = UserBodyType(apiResponse.body).problems === undefined;


  expect(apiResponse.body.data).toEqual(
    expect.objectContaining({
      id: userId,
      email: userEmail,
      avatar: userAvatar,
    })
  );
  expect(apiResponse.body.support).toEqual(expectedData.jsonBodySupport);
});

test(`Get list of users`, async ({ app }) => {
  const page: number = 2;
  const perPage: number|undefined = undefined;
  const total: number = 12;
  // const totalPages: number = Math.ceil(total / perPage);

  const apiResponse = await app.apiRequests.getUsersList(page, perPage);

  expect(apiResponse.status).toBe(200);
  expect(apiResponse.body).toEqual(
    expect.objectContaining({
      page: page,
      per_page: 6,
      total: total,
      // total_pages: totalPages,
    })
  );
  expect(apiResponse.body.support).toEqual(expectedData.jsonBodySupport);
});

test(`Get user not found by id`, async ({ app }) => {
  const userId: number = 222;

  const apiResponse = await app.apiRequests.getUserById(userId);
  expect(apiResponse.status).toBe(404);
  expect(apiResponse.body).toEqual({});
});
