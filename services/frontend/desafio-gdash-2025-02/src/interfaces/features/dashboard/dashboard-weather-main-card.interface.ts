import type { LucideIcon } from 'lucide-react';

export interface DasboardWeatherMainCardProps {
    className?: string,
    title: string;
    icon: LucideIcon;
    data: string;
    variant?: 'temperature' | 'neutral' | 'clouds' | 'temperatureMinMax' | "windChill";
}
