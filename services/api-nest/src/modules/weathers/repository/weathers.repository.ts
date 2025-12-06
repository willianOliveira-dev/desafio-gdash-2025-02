import { InjectModel } from '@nestjs/mongoose'
import { Weather } from '../schemas/weathers.schema'
import { PaginateResult } from 'mongoose'
import { CreateWeatherDto } from '../dto/create-weather.dto'
import { Injectable } from '@nestjs/common'
import type {
  WeatherModelPaginate,
  WeatherModel,
  WeatherDocument,
} from '../interfaces/weather.interface'
import type { PaginationFilter } from '../interfaces/paginatio-filter.interface'

@Injectable()
export class WeathersRepository {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: WeatherModelPaginate,
  ) {}

  async paginate({
    query,
    options,
  }: PaginationFilter): Promise<PaginateResult<WeatherDocument>> {
    return this.weatherModel.paginate(query, options)
  }

  async findAll(): Promise<WeatherModel[]> {
    return this.weatherModel.find().lean().select('-__v').exec()
  }

  async create(dto: CreateWeatherDto): Promise<WeatherModel> {
    const createdWeather = new this.weatherModel(dto)
    const savedWeather = await createdWeather.save()
    const { __v, ...weather } = savedWeather.toObject()
    return weather
  }

  async getLastDays(days: number = 7): Promise<WeatherModel[]> {
    const now = new Date()
    const lastDays = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    return this.weatherModel
      .find({ createdAt: { $gte: lastDays, $lte: now } })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean()
      .exec()
  }

  async getTodayWeatherRecords(
    startDate: Date,
    endDate: Date,
  ): Promise<WeatherModel[]> {
    return this.weatherModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean()
      .exec()
  }
}
