import { AppSidebar } from '@/components/shared/app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { useLocation } from '@tanstack/react-router';

interface PageMapping {
    '/dashboard': string;
    '/users': string;
    '/explore': string;
}

export function Sidebar({ children }: { children: React.ReactNode }) {
    const pageMapping: PageMapping = {
        '/dashboard': 'Monitoramento climático com insights de IA',
        '/users': 'Gestão de Usuários',
        '/explore': 'Explore o mundo de Rick e Morty',
    };

    const { pathname } = useLocation();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        {
                                            pageMapping[
                                                pathname as keyof PageMapping
                                            ]
                                        }
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="px-6 py-3">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
