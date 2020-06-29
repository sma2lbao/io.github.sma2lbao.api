import * as Joi from '@hapi/joi';

const schemas = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'local')
    .default('local'),
  PORT: Joi.number().default(3000),
  // REDIS 配置
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  REDIS_TTL: Joi.number(),
  REDIS_MAX: Joi.number(),

  // 数据库设置
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().default('root'),
  DB_PASSWORD: Joi.string().default('root'),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(true),
  // 邮箱设置
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_SECURE: Joi.boolean().default(false),
  MAIL_USER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  MAIL_FROM: Joi.string().default('No Reply <664413073@qq.com>'),
  // github设置
  GITHUB_AUTH_URL: Joi.string().required(),
  GITHUB_TOKEN_URL: Joi.string().required(),
  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GITHUB_CALLBACK_URL: Joi.string().required(),
  GITHUB_FAILURE_URL: Joi.string().required(),
  GITHUB_SCOPE: Joi.string().required(),
  // apollo setting
  APOLLO_KEY: Joi.string(),
  APOLLO_API_KEY: Joi.string(),
  APOLLO_GRAPH_VARIANT: Joi.string(),
  // OSS setting
  OSS_REGION: Joi.string(),
  OSS_ACCESS_KEY_ID: Joi.string(),
  OSS_ACCESS_KEY_SECRET: Joi.string(),
  OSS_BUCKET: Joi.string(),
});

export default schemas;
