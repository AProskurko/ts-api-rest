import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import * as expectedData from "./test-data/expectedResponseData";
import {supportZod } from "../types/zod/support.zod";

test(`Get resource by id`, async ({ app }) => {
const resourceId = 2;

    const response = await app.apiRequests.getResourceById(resourceId);
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
    expect(() => supportZod.parse(responseBody.support)).toThrow();
})

