import { AuthContext } from '@/contexts/auth-context';
import { useMe } from '@/hooks/use-me';
import { logoutService } from '@/services/auth.service';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useMe();

    const logout = async () => {
        try {
            await logoutService();
        } finally {
            queryClient.clear();
            navigate({ to: '/login' });
        }
    };

    useEffect(() => {
        if (isError && !isLoading) {
            queryClient.clear();
            navigate({ to: '/login' });
        }
    }, [isError, isLoading]);

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isAuthenticated: !!data,
                isLoading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
