import { registerAs } from "@nestjs/config";

const { env } = process

export default registerAs("apollo", () => ({
  key: env.APOLLO_KEY || '',
  apiKey: env.APOLLO_API_KEY,
  schemaTag: env.APOLLO_SCHEMA_TAG
}));
