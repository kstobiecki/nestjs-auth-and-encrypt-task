import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const User = createParamDecorator((data, req: ExecutionContextHost) => {
  return req.getArgs()[0].user;
});
