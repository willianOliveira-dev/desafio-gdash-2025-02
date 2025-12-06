export interface User {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
}
