import type { Weather } from './weather.interface';

export interface WeatherPageResult {
    data: Weather[];
    meta: {
        total: number;
        limit: number;
        page: number | undefined;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
