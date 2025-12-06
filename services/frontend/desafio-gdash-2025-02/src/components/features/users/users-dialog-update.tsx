import { DialogContent } from '@/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { toast } from 'sonner';
import { apiErrorSchema } from '@/http/schemas/api-error.schema';
import { Eye, EyeClosed, Camera, User as UserLucide } from 'lucide-react';
import { api } from '@/services/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';

import { userUpdateSchema } from '@/http/schemas/user-update.schema';
import { Avatar as AvatarShadcn, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/interfaces/http/models/user.interface';
import type { Avatar } from '@/interfaces/http/models/avatar.interface';

export function UsersDialogUpdate({
    user,
    setIsDialogOpen,
}: {
    user: User;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [eyeOpen, setEyeOpen] = useState<boolean>(false);
    const [isLoadling, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const queryClient = useQueryClient();

    const handleSubmit = async (value: any) => {
        setIsLoading(true);
        try {
            const rawData = value.value;

            const dataToSubmit: Record<string, any> = {};

            for (const key in rawData) {
                if (rawData[key] !== '' && rawData[key] !== undefined) {
                    dataToSubmit[key] = rawData[key];
                }
            }
            await api<User>(`users/${user._id}`, {
                method: 'PATCH',
                body: JSON.stringify(dataToSubmit),
            });

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('userId', user._id);

                await api<Avatar>('avatars/upload', {
                    method: 'POST',
                    body: formData,
                });
            }

            toast.success('Usuário atualizado com sucesso!', {
                richColors: true,
            });

            setIsDialogOpen(false);

            queryClient.invalidateQueries({ queryKey: ['users'] });
        } catch (error) {
            console.log(error);
            const parsed = apiErrorSchema.safeParse(error);

            if (parsed.success) {
                toast.error(parsed.data.message, { richColors: true });
                return;
            }

            toast.error('Erro ao atualizar usuário.', { richColors: true });
        } finally {
            setIsLoading(false);
        }
    };

    const form = useForm({
        defaultValues: {
            username: user.username,
            email: user.email,
            password: '',
            role: user.role,
        },
        validators: {
            onSubmit: userUpdateSchema as any,
        },
        onSubmit: handleSubmit,
    });

    return (
        <DialogContent className="max-md:h-screen max-w-2xl max-md:rounded-none overflow-y-auto">
            <div className="space-y-5">
                <div className="flex flex-col items-center gap-2">
                    <label className="relative cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-primary-500/20 flex items-center justify-center overflow-hidden">
                            {file ? (
                                <AvatarShadcn className='size-full'>
                                    <AvatarImage
                                        src={URL.createObjectURL(file)}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </AvatarShadcn>
                            ) : user.avatar ? (
                                <AvatarShadcn className='size-full'>
                                    <AvatarImage
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </AvatarShadcn>
                            ) : (
                                <span className="text-sm text-primary-500">
                                    <UserLucide />
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-0 right-0 bg-primary-500 p-1.5 rounded-full text-white">
                            <Camera size={16} />
                        </div>

                        <Input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            className="hidden"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] ?? null)
                            }
                        />
                    </label>

                    <span className="text-sm text-muted-foreground">
                        Clique para alterar a foto
                    </span>
                </div>

                <div className="text-center space-y-1">
                    <h2 className="text-xl font-semibold">Editar Usuário</h2>
                    <p className="text-sm text-text-muted">
                        Atualize os dados do usuário
                    </p>
                </div>

                <form
                    className="space-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="username">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Usuário
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
                        </form.Field>

                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Email
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
                        </form.Field>

                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Nova Senha
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
                                                autoComplete="new-password"
                                            />
                                            <Button
                                                className="absolute right-0 hover:bg-transparent"
                                                variant="ghost"
                                                size="icon"
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
                        </form.Field>

                        <form.Field name="role">
                            {(field) => (
                                <Field>
                                    <FieldLabel>Função</FieldLabel>

                                    <Select
                                        value={field.state.value}
                                        onValueChange={(value) =>
                                            field.handleChange(
                                                value as 'user' | 'admin'
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a função" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="user">
                                                Usuário
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                Administrador
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        </form.Field>
                    </FieldGroup>

                    <Button
                        type="submit"
                        disabled={isLoadling}
                        className="w-full bg-primary-500 hover:bg-primary-600"
                    >
                        {isLoadling
                            ? 'Atualizando usuário...'
                            : 'Atualizar usuário'}
                    </Button>
                </form>
            </div>
        </DialogContent>
    );
}
