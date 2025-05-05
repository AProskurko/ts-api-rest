import { type as t } from "arktype";
import { Support } from "./support.arktype";
import { listMetaData } from "./listMetaData.arktype";

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
  "...": listMetaData,
  data: BodyUserData.array(),
  support: Support,
});

export const schemaUserCreate = t({
  name: "string.alpha",
  job: "string.alpha",
  id: "string",
  createdAt: "string",
});

export const schemaUserUpdate = t({
  name: "string",
  job: "string",
  updatedAt: "string",
});