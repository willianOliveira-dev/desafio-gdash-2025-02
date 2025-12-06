import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { loginFormSchema } from '../../../http/schemas/login-form.schema';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { loginService } from '@/services/auth.service';
import { toast } from 'sonner';
import { apiErrorSchema } from '@/http/schemas/api-error.schema';
import { useNavigate } from '@tanstack/react-router';
import { settings } from '@/config/settings';

export function LoginForm() {
    const [eyeOpen, setEyeOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleSubmit = async (value: any) => {
        try {
            await loginService(value.value);
            navigate({ to: '/dashboard' });
        } catch (error) {
            const parsed = apiErrorSchema.safeParse(error);
            if (parsed.success) {
                toast.error(parsed.data.message, {
                    richColors: true,
                });
                return;
            }
            toast.error('Erro ao realizar login. Tente novamente mais tarde.', {
                richColors: true,
            });
        }
    };
    const form = useForm({
        defaultValues: {
            usernameOrEmail: '',
            password: '',
        },
        validators: {
            onSubmit: loginFormSchema,
        },
        onSubmit: handleSubmit,
    });

    return (
        <div className="flex items-center justify-center size-full p-5">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-1.5 text-center">
                    <div className="space-y-0.5">
                        <span className="block font-bold bg-linear-to-r from-primary-500 via-cyan-500  to-emerald-500 bg-clip-text text-transparent ">
                            GDASH Weather
                        </span>
                        <h2 className="text-xl font-semibold">
                            Bem-vindo de volta
                        </h2>
                    </div>
                    <p className="text-sm text-text-muted">
                        Entre com suas credenciais para acessar
                    </p>
                </div>
                <form
                    className="space-y-3 w-full"
                    id="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="usernameOrEmail"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            E-mail ou Nome de Usuário
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value.trim()}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            placeholder="example@gmail.com ou nome-de-usuário "
                                            autoComplete="off"
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="password"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Senha
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value.trim()}
                                                className="pr-8"
                                                type={
                                                    eyeOpen
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                placeholder="••••••"
                                                autoComplete="current-password"
                                            />
                                            <Button
                                                className="absolute right-0 hover:bg-transparent"
                                                variant={'ghost'}
                                                size={'icon'}
                                                type="button"
                                                onClick={() =>
                                                    setEyeOpen((prev) => !prev)
                                                }
                                            >
                                                {eyeOpen ? (
                                                    <Eye />
                                                ) : (
                                                    <EyeClosed />
                                                )}
                                            </Button>
                                        </div>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                    <Button
                        className="w-full bg-primary-500 hover:bg-primary-600"
                        type="submit"
                    >
                        Entrar
                    </Button>
                </form>
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md px-4 py-2">
                    <p className="text-sm font-bold text-primary-700">
                        Credenciais padrão:
                    </p>
                    <div className="space-y-0.5">
                        <span className="block text-xs text-text-muted">
                            {settings.VITE_ENSURE_DEFAULT_USER_EMAIL} ou{' '}
                            {settings.VITE_ENSURE_DEFAULT_USER_USERNAME}
                        </span>
                        <span className="block text-xs text-text-muted">
                            Senha: {settings.VITE_ENSURE_DEFAULT_USER_PASSWORD}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
