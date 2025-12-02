import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const GetUserPayload = createParamDecorator(
    (key: string, context: ExecutionContext) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const user = request?.user;
        if (user) {
            return key ? user[key] : user;
        }
    }
);
