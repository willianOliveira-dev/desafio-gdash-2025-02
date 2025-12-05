import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useRef } from 'react';
import type { NavEnterpriseProps } from '@/interfaces/shared/nav-enterprise.interface';

export function NavEnterprise({ enterprise }: NavEnterpriseProps) {
    const activeEnterprise = useRef(enterprise);

    if (!activeEnterprise.current) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="bg-linear-to-tr from-primary-500 to-cyan-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <activeEnterprise.current.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                            {activeEnterprise.current.name}
                        </span>
                        <span className="truncate text-xs">
                            {activeEnterprise.current.description}
                        </span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
