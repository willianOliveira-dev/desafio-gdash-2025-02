import type { LucideIcon } from 'lucide-react';

export interface DashboardInsightAiProps {
    title: string;
    description: string;
    icon: LucideIcon;
    type: 'alert' | 'trend' | 'comfort' | 'summary';
}
