import { registerAs } from "@nestjs/config";

const { env } = process

export default registerAs("global", () => ({
  node: env.NODE_ENV,
  port: env.PORT
}));
