import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar implements CustomScalar<unknown, string> {
  description: 'upload custom scalar type';

  parseValue(value: Promise<FileUpload>): any {
    console.log('parseValue: ', value);
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any): any {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }
}
