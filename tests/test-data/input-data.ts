export const userData = {
  id: 2,
  email: "janet.weaver@reqres.in",
  first_name: "Janet",
  last_name: "Weaver",
  avatar: "https://reqres.in/img/faces/2-image.jpg",
};

let userEmail = "eve.holt@reqres.in";
let userInvalidEmail = "invalidEmail";
let userPassword = "pistol";

export const loginTestData: tLoginTestData = {
  validData: [[userEmail, userPassword, "Register user", 200]],
  invalidData: [
    [
      userInvalidEmail,
      userPassword,
      "Register user with invalid email",
      400,
      "Note: Only defined users succeed registration",
    ],
    [userEmail, "", "Register user without password", 400, "Missing password"],
    [
      "",
      userPassword,
      "Register user without email",
      400,
      "Missing email or username",
    ],
    ["", "", "Register user without data", 400, "Missing email or username"],
  ],
};

type tLoginTestData = {
  validData: [string, string, string, number][];
  invalidData: [string, string, string, number, string][];
};
