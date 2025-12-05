import type { LucideIcon } from "lucide-react";

export interface NavMainProps {
    items: {
        title: string;
        href: string;
        icon: LucideIcon;
    }[];
}
