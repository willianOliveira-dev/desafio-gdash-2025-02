import { useQuery } from '@tanstack/react-query';
import { UsersCard } from './users-card';
import { api } from '@/services/api';
import { UsersRecord } from './users-record';
import { toast } from 'sonner';
import { apiErrorSchema } from '@/http/schemas/api-error.schema';
import type { User } from '@/interfaces/http/models/user.interface';

export function ManageUsers() {
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await api<User[]>('users');
                return res.data ?? [];
            } catch (error) {
                const parsed = apiErrorSchema.safeParse(error);
                if (parsed.success) {
                    toast.error(parsed.data.message, {
                        richColors: true,
                    });
                    return;
                }
                toast.error('Erro ao buscar dados de usuários.', {
                    richColors: true,
                });
            }
        },
    });

    if (!data || data.length === 0) return null;

    const total = data.length;
    const totalAdmins = data.filter((user) => user.role === 'admin').length;
    const totalUsers = data.filter((user) => user.role === 'user').length;

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-3">
                <UsersCard data={total} variant="total" />
                <UsersCard data={totalAdmins} variant="admins" />
                <UsersCard data={totalUsers} variant="users" />
            </section>
            <section>
                <UsersRecord data={data} />
            </section>
        </>
    );
}
