import { z } from 'zod';

export const apiErrorSchema = z.object({
    statusCode: z.number().nonoptional(),
    success: z.boolean().default(false),
    error: z.string().nonempty(),
    message: z.string().nonempty(),
    timestamp: z.string().nonempty(),
    path: z.string().nonempty(),
});
