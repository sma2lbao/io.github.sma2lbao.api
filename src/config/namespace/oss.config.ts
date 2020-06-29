import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('oss', () => ({
  region: env.OSS_REGION || 'oss-cn-shenzhen',
  accessKeyId: env.OSS_ACCESS_KEY_ID || 'LTAI4GHbBQaAuG8odUV34171',
  accessKeySecret:
    env.OSS_ACCESS_KEY_SECRET || 'iH9on2ffnfKeHAWZHQX4N27o0asWyd',
  bucket: env.OSS_BUCKET || 'miss-files',
}));
