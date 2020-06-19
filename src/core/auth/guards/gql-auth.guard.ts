import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthenticationError, ApolloError } from "apollo-server-core";
// import { TokenExpiredError } from "jsonwebtoken";
// import { TOKEN_EXPIRED } from "../constants/gql-exception.constant";

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err: any, user: any, info: any) {
    // if (info instanceof TokenExpiredError) {
    //     throw new ApolloError('token已过期', TOKEN_EXPIRED)
    // }
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
