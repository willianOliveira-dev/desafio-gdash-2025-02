import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { DasboardWeatherMainCardProps } from '@/interfaces/features/dashboard/dashboard-weather-main-card.interface';

export function DasboardWeatherMainCard({
    className,
    title,
    data,
    variant = 'neutral',
    ...props
}: DasboardWeatherMainCardProps) {
    const variants = {
        temperature: {
            card: 'bg-linear-to-tr from-primary-500 to-cyan-500',
            iconBg: 'bg-white/40',
            iconText: 'text-white',
            text: 'text-white',
        },
        windChill: {
            card: 'bg-linear-to-tr from-orange-500 to-orange-400',
            iconBg: 'bg-white/40',
            iconText: 'text-white',
            text: 'text-white',
        },
        neutral: {
            card: 'bg-white',
            iconBg: 'bg-muted',
            iconText: 'text-primary-500',
            text: 'text-text',
        },
        temperatureMinMax: {
            card: 'bg-linear-to-tr from-rose-500 to-rose-400',
            iconBg: 'bg-white/40',
            iconText: 'text-white',
            text: 'text-white',
        },
        clouds: {
            card: 'bg-linear-to-tr from-purple-500 to-indigo-400',
            iconBg: 'bg-white/40',
            iconText: 'text-white',
            text: 'text-white',
        },
    };

    let variantStyle = variants[variant];

    return (
        <Card
            className={cn(
                'w-full max-w-full gap-2 hover:scale-105 duration-300',
                className,
                variantStyle.card
            )}
        >
            <CardHeader className="gap-0">
                <div className="flex flex-col gap-2">
                    <div
                        className={cn(
                            'self-start p-2 rounded-md',
                            variantStyle.iconBg
                        )}
                    >
                        <props.icon
                            className={cn('size-5', variantStyle.iconText)}
                        />
                    </div>
                    <CardTitle className={cn('text-sm', variantStyle.text)}>
                        {title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className={cn('text-xl  font-semibold', variantStyle.text)}>
                    {data}
                </p>
            </CardContent>
        </Card>
    );
}
