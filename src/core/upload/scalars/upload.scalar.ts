import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

@Scalar('Upload')
export class JsonScalar implements CustomScalar<unknown, unknown> {
  description: 'upload custom scalar type';

  parseValue(value: unknown): unknown {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: unknown): unknown {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast: ValueNode): unknown {
    return GraphQLUpload.parseLiteral(ast, null);
  }
}
