import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <Outlet />
        </QueryClientProvider>
    );
}
