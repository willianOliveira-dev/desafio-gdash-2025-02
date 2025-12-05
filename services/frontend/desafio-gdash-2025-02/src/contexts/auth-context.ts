import { createContext } from 'react';
import type { AuthContextType } from '@/interfaces/contexts/auth-context.interface';

export const AuthContext = createContext<AuthContextType | null>(null);
