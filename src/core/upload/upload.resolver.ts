import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { FileUpload } from 'graphql-upload';
import { CreateUploadFile } from './dto/upload.dto';
import { UploadScalar } from './scalars/upload.scalar';
import { GraphQLUpload } from 'apollo-server-express';

@Resolver('Upload')
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(returns => String)
  upload_aliyun(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): string {
    console.log(file);
    // const result = await this.uploadService.aliyunUpload(filename, stream);
    // console.log('success');
    return 'success';
  }
}
