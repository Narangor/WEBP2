import { Model } from 'mongoose';
import { TravelPlan, TravelPlanDocument } from './schemas/travel-plan.schema';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';
export declare class TravelPlansService {
    private travelPlanModel;
    private readonly countriesService;
    constructor(travelPlanModel: Model<TravelPlanDocument>, countriesService: CountriesService);
    create(dto: CreateTravelPlanDto): Promise<TravelPlan>;
    findAll(): Promise<TravelPlan[]>;
    findOne(id: string): Promise<TravelPlan>;
    remove(id: string): Promise<void>;
}
