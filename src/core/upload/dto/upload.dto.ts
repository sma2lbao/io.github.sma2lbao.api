import { FileUpload } from 'graphql-upload';
import { ReadStream } from 'fs-capacitor';
import { InputType, Field } from '@nestjs/graphql';
import { UploadScalar } from '../scalars/upload.scalar';

@InputType()
export class CreateUploadFile {
  @Field(() => UploadScalar, { nullable: true })
  file?: any;

  @Field()
  filename: string;
}
