import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { type as t } from "arktype";
import * as expectedData from "./test-data/expectedResponseData";
import {
  SchemaResource,
  SchemaResourceList,
} from "../types/arktypes/resource.arktype";

let resourceId = 2;
const resourceListTestData = [
  [2, 3],
  [2, undefined],
  [undefined, 3],
  [undefined, undefined],
];

test.describe(`Get resources tests`, () => {
  test(`Get resource by id`, async ({ app }) => {
    const response = await app.apiRequests.getById("{resource}", resourceId);
    const responseBody = await response.json();
    // const responseSupport: Support = responseBody.support

    expect(response.status()).toBe(200);
    expect(responseBody.data).toEqual(
      expect.objectContaining({
        id: resourceId,
        name: "fuchsia rose",
        year: 2001,
        color: "#C74375",
        pantone_value: "17-2031",
      })
    );
    expect(responseBody.support).toEqual(expectedData.jsonBodySupport);
  });

  test.describe(`Get list of users`, () => {
    for (const [page, perPage] of resourceListTestData) {
      test(`Get list of users. page = ${page}. perPage = ${perPage}  .`, async ({
        app,
      }) => {
        const apiResponse = await app.apiRequests.getList(
          "unknown",
          page,
          perPage
        );
        const apiResponseBody = await apiResponse.json();
        const outputValidation =
          SchemaResourceList(apiResponseBody) instanceof t.errors;

        expect(apiResponse.status()).toBe(200);
        expect(outputValidation).toBe(false);
      });
    }
  });

  test(`Get resource not found by id`, async ({ app }) => {
    resourceId = 23;

    const apiResponse = await app.apiRequests.getById("unknown", resourceId);
    const apiResponseBody = await apiResponse.json();

    expect(apiResponse.status()).toBe(404);
    expect(apiResponseBody).toEqual({});
  });
});



