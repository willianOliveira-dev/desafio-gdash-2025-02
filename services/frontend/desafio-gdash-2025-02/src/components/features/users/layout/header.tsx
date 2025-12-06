import { Plus } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { UsersDialogCreate } from '../users-dialog-create';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { apiErrorSchema } from '@/http/schemas/api-error.schema';
import { userCreateSchema } from '@/http/schemas/user-create.schema';
import { useForm } from '@tanstack/react-form';
import type { Avatar } from '@/interfaces/http/models/avatar.interface';
import type { User } from '@/interfaces/http/models/user.interface';
import type { UserFormValues } from '@/interfaces/features/users/users-dialog-create.interface';

export function Header() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();

    const handleSubmit = async (value: any) => {
        try {
            const user = await api<User>('users', {
                method: 'POST',
                body: JSON.stringify(value.value),
            });

            if (file && user.data) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('userId', user.data._id);

                await api<Avatar>('avatars/upload', {
                    method: 'POST',
                    body: formData,
                });
            }

            toast.success('Usuário criado com sucesso!', {
                richColors: true,
            });

            setIsDialogOpen(false);

            queryClient.invalidateQueries({ queryKey: ['users'] });
        } catch (error) {
            const parsed = apiErrorSchema.safeParse(error);

            if (parsed.success) {
                toast.error(parsed.data.message, { richColors: true });
                return;
            }

            toast.error('Erro ao criar usuário.', { richColors: true });
        }
    };

    const clearUserData = () => {
        form.reset();
        setFile(null);
    };

    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            role: 'user',
        },
        validators: {
            onSubmit: userCreateSchema,
        },
        onSubmit: handleSubmit,
    }) as unknown as UserFormValues;

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <header className="flex flex-col sm:flex-row sm:items-center sm:gap-2 justify-between w-full">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-semibold leading-none">
                        Usuários
                    </h1>
                    <p className="flex items-center gap-0.5 text-sm text-text-muted">
                        Gerencie os usuários do sistema
                    </p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <DialogTrigger onClick={clearUserData} asChild>
                        <Button
                            className="text-white bg-primary-500 hover:bg-primary-400 hover:text-white"
                            variant={'outline'}
                        >
                            <Plus className="size-5" />
                            Novo usuário
                        </Button>
                    </DialogTrigger>
                </div>
                <UsersDialogCreate form={form} file={file} setFile={setFile} />
            </header>
        </Dialog>
    );
}
