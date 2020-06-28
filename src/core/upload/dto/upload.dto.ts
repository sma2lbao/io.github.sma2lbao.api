import { FileUpload } from 'graphql-upload';
import { ReadStream } from 'fs-capacitor';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUploadFile implements FileUpload {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  createReadStream(): ReadStream {
    throw new Error('Method not implemented.');
  }
}
