import { meService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: meService,
        retry: false,
        staleTime: 15 * 60 * 1000,
    });
}
