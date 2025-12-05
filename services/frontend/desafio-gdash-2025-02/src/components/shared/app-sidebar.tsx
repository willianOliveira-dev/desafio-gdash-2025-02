import { Cloud, Compass, LayoutDashboard, Loader, Users } from 'lucide-react';
import { NavMain } from '@/components/shared/nav-main';
import { NavUser } from '@/components/shared/nav-user';
import { NavEnterprise } from '@/components/shared/nav-enteprise';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import type { ComponentProps } from 'react';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    
    const { user, isLoading , logout} = useAuth();

    if (!user || !user.data) {
        return null;
    }

    const { username, avatar, email } = user.data;

    const data = {
        user: {
            name: username,
            email,
            avatar,
        },
        enterprise: {
            name: 'GDASH Weather',
            logo: Cloud,
            description: 'Monitoramento climático',
        },
        navMain: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutDashboard,
            },
            {
                title: 'Usuários',
                href: '/users',
                icon: Users,
            },
            {
                title: 'Explorar',
                href: '/explore',
                icon: Compass,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavEnterprise enterprise={data.enterprise} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {isLoading ? (
                    <Loader className="animate-spin" />
                ) : (
                    <NavUser user={{ username, avatar, email , logout}} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
