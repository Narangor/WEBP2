import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Expense, ExpenseSchema } from './expense.schema';

export type TravelPlanDocument = TravelPlan & Document;

@Schema({ timestamps: true })
export class TravelPlan {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  destinationCountryCode: string;

  @Prop({ type: [ExpenseSchema], default: [] })
  expenses: Expense[];

}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);