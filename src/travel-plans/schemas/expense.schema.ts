import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ _id: true })
export class Expense {
    @Prop({ required: true })
    description: string;

    @Prop({ required: true, min: 0 })
    amount: number;

    @Prop({ required: true })
    category: string;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);