export interface User {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    firstName: string | null;
    lastname: string | null;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
}
