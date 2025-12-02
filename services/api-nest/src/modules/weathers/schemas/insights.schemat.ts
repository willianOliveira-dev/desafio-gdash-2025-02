import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true,
})
export class Insight {
  @Prop({ Type: String, required: true })
  text: string
}

export const InsightSchema = SchemaFactory.createForClass(Insight)
