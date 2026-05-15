import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlan, TravelPlanSchema } from './schemas/travel-plan.schema';
import { CountriesModule } from '../countries/countries.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TravelPlan.name, schema: TravelPlanSchema }]),
    CountriesModule,
    UsersModule,
  ],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
})
export class TravelPlansModule { }
