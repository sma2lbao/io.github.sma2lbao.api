import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('redis', () => ({
  host: env.REDIS_HOST || 'localhost',
  port: env.REDIS_PORT || 6379,
  ttl: env.REDIS_TTL || 5,
  max: env.REDIS_MAX || 100,
}));
