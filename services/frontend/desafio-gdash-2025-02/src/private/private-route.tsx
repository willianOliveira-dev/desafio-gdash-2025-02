import { useAuth } from '@/hooks/use-auth';
import { Navigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export function PrivateRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) return null;

    if (!isAuthenticated) {
        return Navigate({ to: '/login' });
    }

    return children;
}
