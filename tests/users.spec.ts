import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { type as t } from "arktype";
import jsonUserId2 from "../tests/test-data/json-files/user-id2.json";
import { schemaUser, schemaUsersList } from "../types/arktypes/user.arktype";

let userId: number = 2;
let userEmail: string = "janet.weaver@reqres.in";
let userAvatar: string = "https://reqres.in/img/faces/2-image.jpg";
let page: number | undefined = 2;
let perPage: number | undefined = 3;
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

    // const dataUserId2 = jsonUserId2;
    // expect(apiResponse.body).toEqual(dataUserId2);
    // console.log("dataUserId2: " + dataUserId2);

    expect(apiResponseBody.data).toEqual(
      expect.objectContaining({
        id: userId,
        email: userEmail,
        avatar: userAvatar,
      })
    );

    const outputValidation = schemaUser(apiResponseBody) instanceof t.errors;
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
          schemaUsersList(apiResponseBody) instanceof t.errors;

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
});


