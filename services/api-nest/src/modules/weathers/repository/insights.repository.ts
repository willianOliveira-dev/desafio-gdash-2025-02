import { InjectModel } from '@nestjs/mongoose'
import { Insight } from '../schemas/insights.schemat'
import { InsightDocument, InsightModel } from '../interfaces/insights.interface'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InsightsRepository {
  constructor(
    @InjectModel(Insight.name)
    private readonly insightModel: Model<InsightDocument>,
  ) {}

  async findInsightsCount(): Promise<number> {
    return this.insightModel.estimatedDocumentCount().exec()
  }

  async getLatestInsights(): Promise<InsightModel | null> {
    return this.insightModel.findOne().sort({ createdAt: -1 }).lean().exec()
  }

  async create(weatherInsights: string): Promise<void> {
    const createdInsigth = new this.insightModel({ text: weatherInsights })
    await createdInsigth.save()
  }
}
