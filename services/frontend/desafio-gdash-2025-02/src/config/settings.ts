import z from 'zod';

const envSchema = z.object({
    VITE_FRONTEND_URL: z.string().nonempty(),
    VITE_API_URL: z.string().nonempty(),
    VITE_ENSURE_DEFAULT_USER_USERNAME: z.string().nonempty(),
    VITE_ENSURE_DEFAULT_USER_EMAIL: z.string().nonempty(),
    VITE_ENSURE_DEFAULT_USER_PASSWORD: z.string().nonempty(),
});

export const settings = envSchema.parse(import.meta.env);
