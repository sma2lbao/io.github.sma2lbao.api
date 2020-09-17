import {
  CanActivate,
  mixin,
  Type,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserNotFound } from '@/global/exceptions/users/user.exception';

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
      if (err || (!user && required)) {
        throw new UserNotFound();
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
