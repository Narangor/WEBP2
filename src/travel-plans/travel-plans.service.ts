import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelPlan, TravelPlanDocument } from './schemas/travel-plan.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlan.name) private travelPlanModel: Model<TravelPlanDocument>,
    private readonly countriesService: CountriesService,
    private readonly usersService: UsersService,
  ) { }

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.countriesService.findOrFetch(dto.destinationCountryCode);
    await this.usersService.findOne(dto.userId);
    const plan = new this.travelPlanModel({
      userId: dto.userId,
      title: dto.title,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      destinationCountryCode: dto.destinationCountryCode,
    });
    return plan.save();
  }

  async findAll(): Promise<TravelPlan[]> {
    return this.travelPlanModel.find().exec();
  }

  async findOne(id: string): Promise<TravelPlan> {
    const plan = await this.travelPlanModel.findById(id).exec();
    if (!plan) throw new NotFoundException(`Travel plan '${id}' not found`);
    return plan;
  }

  async remove(id: string): Promise<void> {
    const result = await this.travelPlanModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Travel plan '${id}' not found`);
  }

  async addExpense(planId: string, dto: CreateExpenseDto): Promise<TravelPlanDocument> {
    const plan = await this.travelPlanModel.findByIdAndUpdate(
      planId,
      { $push: { expenses: dto } },
      { new: true },
    ).exec();

    if (!plan) throw new NotFoundException(`Plan ${planId} no encontrado.`);
    return plan;
  }
}
