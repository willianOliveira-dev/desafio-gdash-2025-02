import type { apiErrorSchema } from '@/http/schemas/api-error.schema';
import type { z } from 'zod';

export type ApiError = z.infer<typeof apiErrorSchema>;
