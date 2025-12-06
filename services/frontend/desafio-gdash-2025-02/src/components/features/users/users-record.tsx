import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dateFormat } from '@/helpers/date-format';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Pencil } from 'lucide-react';
import { DialogTrigger, Dialog } from '@/components/ui/dialog';
import { UsersDialogUpdate } from './users-dialog-update';
import { settings } from '@/config/settings';
import { useState } from 'react';
import { UsersDeleteButton } from './users-delete-button';
import type { User } from '@/interfaces/http/models/user.interface';

export function UsersRecord({ data }: { data: User[] }) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const isDialogOpen = !!selectedUser;

    const closeDialog = () => setSelectedUser(null);

    return (
        <div className="border p-2.5 rounded-md">
            <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        closeDialog();
                    }
                }}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Função</TableHead>
                            <TableHead>Criado em</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.username}
                                            />
                                            <AvatarFallback className="flex justify-center items-center size-full bg-cyan-500/20 rounded-full">
                                                {user.username
                                                    .at(0)
                                                    ?.toLocaleUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {user.username}
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    {dateFormat({
                                        date: new Date(user.createdAt),
                                        format: 'dd/MM/yyyy',
                                    })}
                                </TableCell>
                                <TableCell>
                                    <DialogTrigger
                                        disabled={
                                            settings.VITE_ENSURE_DEFAULT_USER_USERNAME ===
                                            user.username
                                        }
                                        onClick={() => setSelectedUser(user)}
                                        asChild
                                    >
                                        <Button variant={'ghost'} size={'icon'}>
                                            <Pencil />
                                        </Button>
                                    </DialogTrigger>

                                    <UsersDeleteButton user={user} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {selectedUser && (
                    <UsersDialogUpdate
                        setIsDialogOpen={closeDialog}
                        user={selectedUser}
                    />
                )}
            </Dialog>
        </div>
    );
}
