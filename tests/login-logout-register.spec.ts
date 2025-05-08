import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { loginTestData as inputData } from "./test-data/input-data";
import { type as t } from "arktype";
import * as loginArktype from "../types/arktypes/login.arktype";

let userName = "";
let userEmail = "eve.holt@reqres.in";
let userPassword = "pistol";

type tLoginTestData = [string | undefined, string | undefined, string, number];

const loginTestData: tLoginTestData[] = [
  [userEmail, userPassword, "Register user", 200],
  [userEmail, , "Register user without password", 400],
  [, userPassword, "Register user without email", 400],
  ["", "", "Register user without data", 400],
];

//* In progress
test.describe.serial(`Register test`, () => {
  for (const [email, password, testTitle, status] of inputData.validData) {
    test(testTitle, async ({ app }) => {
      console.log(email, password, testTitle);
      const apiResponse = await app.apiRequests.register(email, password);
      const apiResponseBody = await apiResponse.json();
      console.log(apiResponseBody);

      expect(apiResponse.status()).toBe(status);
    });
  }
});

test.describe.serial(`Login test`, () => {});