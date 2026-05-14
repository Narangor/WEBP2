import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelPlan, TravelPlanDocument } from './schemas/travel-plan.schema';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlan.name) private travelPlanModel: Model<TravelPlanDocument>,
    private readonly countriesService: CountriesService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.countriesService.findOrFetch(dto.destinationCountryCode);
    const plan = new this.travelPlanModel({
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
}
