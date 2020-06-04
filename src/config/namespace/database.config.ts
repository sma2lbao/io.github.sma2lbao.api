import { registerAs } from "@nestjs/config";

const { env } = process

export default registerAs("database", () => ({
  type: env.DB_TYPE || 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: env.DB_SYNCHRONIZE
}));
