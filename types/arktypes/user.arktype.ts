import { type as t } from "arktype";
import { Support } from "./support.arktype";

export const BodyUserData = t({
  id: "number > 0",
  email: "string.email",
  first_name: "string.alpha",
  last_name: "string.alpha",
  avatar: "string.url",
});

export const schemaUser = t({
  data: BodyUserData,
  support: Support,
});

export const schemaUsersList = t({
  page: "number > 0",
  per_page: "number > 0",
  total: "number > 0",
  total_pages: "number > 0",
  data: BodyUserData.array(),
  support: Support,
});

// export type tUserBody = typeof UserBody["infer"];
// export type tUsersListBody = typeof UsersListBody["infer"];
