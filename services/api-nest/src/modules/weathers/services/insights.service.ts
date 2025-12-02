import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { WeathersRepository } from '../repository/weathers.repository';
import { CLIMATE_INSIGHTS_PROMPT } from 'src/helpers/climate-insights-prompt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InsightsRepository } from '../repository/insights.repository';
import { WeatherInsights } from '../interfaces/insights.interface';

@Injectable()
export class InsightsService {
    constructor(
        private readonly weatherRepo: WeathersRepository,
        private readonly insightRepo: InsightsRepository
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    async generateWeatherInsights(): Promise<void> {
        const dataLastDays = await this.weatherRepo.getLastDays();

        const maxRetries: number = 3;

        for (let attempts = 1; attempts <= maxRetries; attempts++) {
            try {
                const { text } = await generateText({
                    model: google('gemini-2.5-flash'),
                    prompt: CLIMATE_INSIGHTS_PROMPT(
                        JSON.stringify(dataLastDays, null, 2)
                    ),
                    temperature: 0.7,
                });
                console.log(text);
                JSON.parse(text.trim());

                await this.insightRepo.create(text.trim());

                return;
            } catch (err) {
                console.warn(`Tentativa ${attempts}/${maxRetries}: ${err}`);

                if (attempts == maxRetries) {
                    throw new HttpException(
                        'Não foi possível gerar insights após 3 tentativas. JSON inválido.',
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                }

                await new Promise((res) => setTimeout(res, 1000));
            }
        }
    }

    async existingInsights(): Promise<boolean> {
        const count = await this.insightRepo.findInsightsCount();
        return count > 0;
    }

    async getLastestInsights(): Promise<WeatherInsights[]> {
        const textInsigths = await this.insightRepo.getLatestInsights();

        if (!textInsigths) {
            throw new HttpException(
                'Insigths não encontrados.',
                HttpStatus.NOT_FOUND
            );
        }

        try {
            const insigths = JSON.parse(textInsigths.text);
            return insigths as WeatherInsights[];
        } catch (error) {
            throw new HttpException(
                'Houve um problema ao buscar insights.',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
