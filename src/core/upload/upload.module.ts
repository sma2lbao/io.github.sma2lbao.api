import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { UploadScalar } from './scalars/upload.scalar';

@Module({
  providers: [UploadService, UploadScalar, UploadResolver],
  exports: [UploadScalar],
})
export class UploadModule {}
