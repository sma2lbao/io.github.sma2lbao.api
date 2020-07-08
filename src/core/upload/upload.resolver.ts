import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { FileUpload } from 'graphql-upload';
import { CreateUploadFile } from './dto/upload.dto';
import { UploadScalar } from './scalars/upload.scalar';
import { GraphQLUpload } from 'apollo-server-express';

@Resolver('Upload')
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => String)
  async upload_file_oss(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    const url = await this.uploadService.aliyunUpload(file);
    return url;
  }
}
