import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    // console.log('current user');
    return req.user as { userId: string; email: string };
  },
);
