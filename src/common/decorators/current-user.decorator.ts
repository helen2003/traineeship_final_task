import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { ValidateUser } from './dto/validate-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ValidateUser => {
    const ctx = GqlExecutionContext.create(context);
    const body = ctx.getContext() as { req: Request };
    const request = body.req;
    return request.user as ValidateUser;
  },
);