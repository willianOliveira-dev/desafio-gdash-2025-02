import { z } from 'zod';

export const loginFormSchema = z.object({
    usernameOrEmail: z
        .string({ message: 'O nome ou e-mail deve ser um texto.' })
        .nonempty({ message: 'O nome ou e-mail são obrigatórios.' }),
    password: z
        .string({ message: 'A senha deve ser um texto.' })
        .nonempty({ message: 'A senha é obrigatória.' }),
});


