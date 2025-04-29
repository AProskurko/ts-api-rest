import { type as t } from "arktype";

export const listMetaData = t({
  page: "number > 0",
  per_page: "number > 0",
  total: "number > 0",
  total_pages: "number > 0",
});