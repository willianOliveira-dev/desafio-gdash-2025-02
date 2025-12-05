import type { ApiResponse } from '../http/response/api-response.interface';
import type { User } from '../http/models/user.interface';

export interface AuthContextType {
    user: ApiResponse<User> | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
}
