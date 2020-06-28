import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { FileUpload } from 'graphql-upload';
import { CreateUploadFile } from './dto/upload.dto';
import { UploadScalar } from './scalars/upload.scalar';

@Resolver('Upload')
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(returns => String)
  upload_aliyun(
    @Args({ name: 'file', type: () => UploadScalar }) file: any,
  ): string {
    console.log(file);
    // const { filename } = file;
    // const stream = file.createReadStream();
    // const result = await this.uploadService.aliyunUpload(filename, stream);
    // console.log('success');
    return 'success';
  }
}
