import { z } from 'zod';

export const userUpdateSchema = z.object({
    username: z
        .string({ message: 'O nome de usuário deve ser um texto.' })
        .nonempty({ message: 'O nome de usuário é obrigatório.' })
        .regex(/^[A-Za-z0-9_-]+$/, {
            message: 'Só são permitidos letras, números, "-" e "_"',
        })
        .min(2, {
            message: 'O nome de usuário deve ter entre 2 e 25 caracteres.',
        })
        .max(25, {
            message: 'O nome de usuário deve ter entre 2 e 25 caracteres.',
        })
        .transform((value) => value.toLowerCase()),

    email: z
        .string({ message: 'O e-mail deve ser um texto.' })
        .nonempty({ message: 'O e-mail é obrigatório.' })
        .email({ message: 'O e-mail informado não é válido.' }),

    password: z
        .string({ message: 'A senha deve ser um texto.' })
        .nonempty({ message: 'A senha é obrigatória.' })
        .min(8, {
            message: 'A senha deve ter entre 8 e 64 caracteres.',
        })
        .max(64, {
            message: 'A senha deve ter entre 8 e 64 caracteres.',
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,#^()\-_=+]).+$/, {
            message:
                'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
        })
        .optional()
        .or(z.literal('')),

    role: z.enum(['user', 'admin'], {
        message: 'O papel deve ser "user" ou "admin".',
    }),
});
