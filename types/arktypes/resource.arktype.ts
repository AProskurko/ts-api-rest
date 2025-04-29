import { type as t } from "arktype";
import { Support } from "./support.arktype";
import { listMetaData } from "./listMetaData.arktype";

export const BodyResourceData = t({
  id: "number > 0",
  name: "string",
  year: "number",
  color: "string",
  pantone_value: "string",
});

export const SchemaResource = t({
  data: BodyResourceData,
  support: Support,
});

export const SchemaResourceList = t({
  "...": listMetaData,
  data: BodyResourceData.array(),
  support: Support,
});