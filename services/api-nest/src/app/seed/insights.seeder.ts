import { Injectable } from '@nestjs/common';
import { InsightsService } from 'src/modules/weathers/services/insights.service';

@Injectable()
export class InsightsSeeder {
    constructor(private readonly insightsService: InsightsService) {}

    async seed(): Promise<void> {
        const existingInsights = await this.insightsService.existingInsights();

        if (existingInsights) return;

        await this.insightsService.generateWeatherInsights();
    }
}
