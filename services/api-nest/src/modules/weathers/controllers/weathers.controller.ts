import { Body, Controller, HttpCode, Query, UseGuards } from '@nestjs/common';
import { WeathersService } from '../services/weathers.service';
import { Get, Post } from '@nestjs/common';
import { GetWeathersDto } from '../dto/get-weather.dto';
import { CreateWeatherDto } from '../dto/create-weather.dto';
import { InsightsService } from '../services/insights.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('weather')
@UseGuards(JwtAuthGuard)
export class WeathersController {
    constructor(
        private readonly weathersService: WeathersService,
        private readonly insightsService: InsightsService
    ) {}

    @Get('logs')
    async getPaginatedWeathers(@Query() query: GetWeathersDto) {
        const weathers = await this.weathersService.getPaginatedWeathers(query);
        return {
            message: 'Dados climáticos encontrados com sucesso.',
            data: weathers,
        };
    }

    @Post('logs')
    async createWeather(@Body() dto: CreateWeatherDto) {
        const weather = await this.weathersService.create(dto);
        return {
            message: 'Registro de clima criado com sucesso.',
            data: weather,
        };
    }

    @Get('today')
    async getTodayWeatherRecord() {
        const weathers = await this.weathersService.getTodayWeatherRecord();

        return {
            message: 'Dados climáticos de hoje encontrados com sucesso.',
            data: weathers,
        };
    }

    @Get('insights')
    async getWeatherInsights() {
        const weatherInsights = await this.insightsService.getLastestInsights();
        return {
            message: 'Insights climáticos encontrados com sucesso.',
            data: weatherInsights,
        };
    }
}
