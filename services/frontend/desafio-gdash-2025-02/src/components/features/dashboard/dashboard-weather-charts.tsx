import { useQuery } from '@tanstack/react-query';
import { DashboardChartHumidity } from './dashboard-chart-humidity';
import { DashboardChartFeelsLike } from './dashboard-chart-feels-like';
import { api } from '@/services/api';
import { DashboardChartWind } from './dashboard-chart-wind';
import type { Weather } from '@/interfaces/http/models/weather.interface';

export function DashboardWeatherCharts() {
    const { data } = useQuery({
        queryKey: ['weather-charts-today'],
        queryFn: async () => {
            const res = await api<Weather[]>('weather/today');
            return res.data ?? [];
        },
    });
    console.log(data)
    if (!data || data.length === 0) return null;

    return (
        <section className="flex flex-col lg:flex-row gap-4">
            <DashboardChartFeelsLike data={data} />
            <DashboardChartHumidity data={data} />
            <DashboardChartWind data={data} />
        </section>
    );
}
