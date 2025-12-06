import { DialogContent } from '@/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeClosed, Camera, User as UserLucide } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Avatar as AvatarShadcn, AvatarImage } from '@/components/ui/avatar';
import type { UsersDialogCreateProps } from '@/interfaces/features/users/users-dialog-create.interface';

export function UsersDialogCreate({
    file,
    form,
    setFile,
    isLoading,
}: UsersDialogCreateProps) {
    const [eyeOpen, setEyeOpen] = useState(false);

    return (
        <DialogContent
            aria-describedby={undefined}
            className="max-md:h-screen max-w-2xl max-md:rounded-none overflow-y-auto"
        >
            <div className="space-y-5">
                <div className="flex flex-col items-center gap-2">
                    <label className="relative cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-primary-500/20 flex items-center justify-center overflow-hidden">
                            {file ? (
                                <AvatarShadcn className="size-full">
                                    <AvatarImage
                                        src={URL.createObjectURL(file)}
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
                        Clique para adicionar foto
                    </span>
                </div>

                <div className="text-center space-y-1">
                    <h2 className="text-xl font-semibold">Novo Usuário</h2>
                    <p className="text-sm text-text-muted">
                        Preencha os dados para criar um novo usuário
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
                        className="w-full bg-primary-500 hover:bg-primary-600"
                    >
                        {isLoading ? 'Criando...' : 'Criar usuário'}
                    </Button>
                </form>
            </div>
        </DialogContent>
    );
}
