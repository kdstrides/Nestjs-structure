import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueriedEntity = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.Body;
  },
);