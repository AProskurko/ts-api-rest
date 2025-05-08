import { type as t } from "arktype";

export const registerResponse = t({
    id: "number > 0",
    token: "string"
});

export const registerError = t({
    error: "string"
});

export const errorResponse = t({
  token: "string"
});