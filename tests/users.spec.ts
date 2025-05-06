import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { type as t } from "arktype";
import jsonUserId2 from "../tests/test-data/json-files/user-id2.json";
import * as aUser from "../types/arktypes/user.arktype";

let userId: number = 2;
let userEmail: string = "janet.weaver@reqres.in";
let userAvatar: string = "https://reqres.in/img/faces/2-image.jpg";
let userName: string = "Bob";
let userJob: string = "Boss";
const userListTestData = [
  [2, 3],
  [2, undefined],
  [undefined, 3],
  [undefined, undefined],
];

test.describe(`Get users tets`, () => {
  test(`Get single user by id`, async ({ app }) => {
    const apiResponse = await app.apiRequests.getById("users", userId);
    const apiResponseBody = await apiResponse.json();
    expect(apiResponse.status()).toBe(200);

    expect(apiResponseBody.data).toEqual(
      expect.objectContaining({
        id: userId,
        email: userEmail,
        avatar: userAvatar,
      })
    );

    const outputValidation =
      aUser.schemaUser(apiResponseBody) instanceof t.errors;
    expect(outputValidation).toBe(false);
  });

  test.describe(`Get list of users`, () => {
    for (const [page, perPage] of userListTestData) {
      test(`Get list of users. page = ${page}. perPage = ${perPage}  .`, async ({
        app,
      }) => {
        const apiResponse = await app.apiRequests.getList(
          "users",
          page,
          perPage
        );
        const apiResponseBody = await apiResponse.json();
        const outputValidation =
          aUser.schemaUsersList(apiResponseBody) instanceof t.errors;

        expect(apiResponse.status()).toBe(200);
        expect(outputValidation).toBe(false);
      });
    }
  });

  test(`Get user not found by id`, async ({ app }) => {
    userId = 222;

    const apiResponse = await app.apiRequests.getById("users", userId);
    const apiResponseBody = await apiResponse.json();

    expect(apiResponse.status()).toBe(404);
    expect(apiResponseBody).toEqual({});
  });

  test(`Create new user`, async ({ app }) => {
    const apiResponse = await app.apiRequests.post("users", userName, userJob);
    const apiResponseBody = await apiResponse.json();
    expect(apiResponse.status()).toBe(201);

    const outputValidation =
      aUser.schemaUserCreate(apiResponseBody) instanceof t.errors;
    expect(outputValidation).toBe(false);
  });

  test.describe(`Update user`, () => {
    const currentYearMonth = new Date().toISOString().slice(0, 7);
    const updateDate = new RegExp(`^${currentYearMonth}`);

    test(`Update user via put`, async ({ app }) => {
      userName += "Put";
      userJob += "Put";

      const apiResponse = await app.apiRequests.put(
        "users",
        userId,
        userName,
        userJob
      );
      const apiResponseBody = await apiResponse.json();
      expect(apiResponse.status()).toBe(200);

      expect(apiResponseBody).toEqual(
        expect.objectContaining({
          name: userName,
          job: userJob,
          updatedAt: expect.stringMatching(updateDate),
        })
      );

      const outputValidation =
        aUser.schemaUserUpdate(apiResponseBody) instanceof t.errors;
      expect(outputValidation).toBe(false);
    });

    test(`Update user via patch`, async ({ app }) => {
      userName += "Patch";
      userJob += "Patch";
      const apiResponse = await app.apiRequests.patch(
        "users",
        userId,
        userName,
        userJob
      );
      const apiResponseBody = await apiResponse.json();
      expect(apiResponse.status()).toBe(200);

      expect(apiResponseBody).toEqual(
        expect.objectContaining({
          name: userName,
          job: userJob,
          updatedAt: expect.stringMatching(updateDate),
        })
      );

      const outputValidation =
        aUser.schemaUserUpdate(apiResponseBody) instanceof t.errors;
      expect(outputValidation).toBe(false);
    });
  });

  test(`Delete user by id`, async ({ app }) => {
    const apiResponse = await app.apiRequests.delete("users", userId);
    expect(apiResponse.status()).toBe(204);
  });
});