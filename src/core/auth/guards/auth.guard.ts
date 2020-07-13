import {
  CanActivate,
  mixin,
  Type,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface JwtAuthGuardOptions {
  required?: boolean;
}

/**
 * @param required User is required to be present
 */
function createJwtAuthGuard({ required = true } = {}) {
  @Injectable()
  class GqlJwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    handleRequest(err: any, user: any, info: any) {
      // if (info instanceof TokenExpiredError) {
      //     throw new ApolloError('token已过期', TOKEN_EXPIRED)
      // }
      if (err || (!user && required)) {
        throw new UnauthorizedException();
      }
      return user;
    }
  }

  return mixin(GqlJwtAuthGuard);
}

export const GqlJwtAuthGuard: Type<CanActivate> = createJwtAuthGuard({
  required: true,
});

export const JwtAuthGuard: (
  options?: JwtAuthGuardOptions,
) => Type<CanActivate> = (options?) => createJwtAuthGuard(options);
