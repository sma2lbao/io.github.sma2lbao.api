import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarType, ValueNode } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

@Scalar('Json')
export class JsonScalar implements CustomScalar<unknown, unknown> {
  description: string;
  private graphQLScalarType: GraphQLScalarType;

  constructor() {
    this.graphQLScalarType = GraphQLJSON;
    this.description = this.graphQLScalarType.description;
  }

  parseValue(value: unknown): unknown {
    return this.graphQLScalarType.parseValue(value);
  }

  serialize(value: unknown): unknown {
    return this.graphQLScalarType.serialize(value);
  }

  parseLiteral(ast: ValueNode): unknown {
    return this.graphQLScalarType.parseLiteral(ast, null);
  }
}
