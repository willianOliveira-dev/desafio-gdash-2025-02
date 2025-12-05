import { LoginForm } from '@/components/features/login/login-form';
import { LoginPresentation } from '@/components/features/login/login-presentation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    return (
        <main className="flex flex-col md:flex-row h-screen">
            <LoginPresentation />
            <LoginForm />
            <div className="fixed bottom-0 right-0 left-0 md:hidden h-3.5 bg-linear-to-br from-primary-500 via-cyan-500  to-emerald-500"></div>
        </main>
    );
}
