import { AuthContext } from '@/contexts/auth-context';
import { useContext } from 'react';

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro do AuthProvider.');
    }

    return context;
}
