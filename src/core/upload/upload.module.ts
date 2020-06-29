import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { UploadScalar } from './scalars/upload.scalar';
import { ConfigService } from '@nestjs/config';
import * as OSS from 'ali-oss';
import { OSS_INTERCEPTOR } from './upload.constant';

@Module({
  providers: [
    UploadService,
    UploadScalar,
    UploadResolver,
    {
      provide: OSS_INTERCEPTOR,
      useFactory: (config: ConfigService) => {
        const client = new OSS({
          region: config.get<string>('oss.region'),
          accessKeyId: config.get<string>('oss.accessKeyId'),
          accessKeySecret: config.get<string>('oss.accessKeySecret'),
          bucket: config.get<string>('oss.bucket'),
        });
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [UploadScalar],
})
export class UploadModule {}
