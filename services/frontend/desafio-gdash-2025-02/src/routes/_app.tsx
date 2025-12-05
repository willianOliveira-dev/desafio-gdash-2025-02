import { Sidebar } from '@/components/layout/sidebar';
import { PrivateRoute } from '@/private/private-route';
import { AuthProvider } from '@/providers/auth-provider';
import { Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
    component: App,
});

function App() {
    return (
        <AuthProvider>
            <Sidebar>
                <PrivateRoute>
                    <Outlet />
                </PrivateRoute>
            </Sidebar>
        </AuthProvider>
    );
}
