import { Card, CardContent } from '@/components/ui/card';
import type { DashboardInsightAiProps } from '@/interfaces/features/dashboard/dashboard-insight-ai.interface';
import { cn } from '@/lib/utils';

export function DashboardInsightAi({
    title,
    description,
    type,
    ...props
}: DashboardInsightAiProps) {
    const types = {
        alert: {
            iconBg: 'bg-red-500/20',
            iconText: 'text-red-500',
            borderHighlight: 'border-l-4 border-l-red-500',
        },
        trend: {
            iconBg: 'bg-muted',
            iconText: 'text-amber-500',
            borderHighlight: 'border-l-4 border-l-amber-500',
        },
        comfort: {
            iconBg: 'bg-emerald-500/20',
            iconText: 'text-emerald-500',
            borderHighlight: 'border-l-4 border-l-emerald-500',
        },
        summary: {
            iconBg: 'bg-primary-500/20',
            iconText: 'text-primary-500',
            borderHighlight: 'border-l-4 border-l-primary-500',
        },
    };
    const type$ = types[type];
    return (
        <Card className={cn('hover:shadow-md duration-300', type$.borderHighlight)}>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className={cn('p-2 rounded-md', type$.iconBg)}>
                        <props.icon className={cn('size-5', type$.iconText)} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="text-xs">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
