import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';

@Catch()
export class GQLExceptionFilter implements GqlExceptionFilter {
  catch(error: ApolloError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    console.log(error);
    return error;
  }
}
