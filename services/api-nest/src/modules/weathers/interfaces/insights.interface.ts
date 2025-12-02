import { Types } from 'mongoose';
import { Insight } from '../schemas/insights.schemat';

export class WeatherInsights {
    'title': string;
    'description': string;
    'icon': string;
    'type': 'alert' | 'trend' | 'comfort' | 'summary';
}

export interface InsightModel extends Insight {
    _id: Types.ObjectId;
}

export interface InsightDocument extends Insight, Document {}
