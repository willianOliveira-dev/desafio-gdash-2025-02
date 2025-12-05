import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavMainProps } from '@/interfaces/shared/nav-main.interface';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';

export function NavMain({ items }: NavMainProps) {
    const { pathname } = useLocation();

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            className={cn(
                                pathname === item.href &&
                                    'bg-linear-to-tr from-primary-500 to-cyan-500 text-white hover:text-white'
                            )}
                            asChild
                        >
                            <Link to={item.href}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
