import { Model } from 'mongoose';
import { TravelPlan, TravelPlanDocument } from './schemas/travel-plan.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';
import { UsersService } from '../users/users.service';
export declare class TravelPlansService {
    private travelPlanModel;
    private readonly countriesService;
    private readonly usersService;
    constructor(travelPlanModel: Model<TravelPlanDocument>, countriesService: CountriesService, usersService: UsersService);
    create(dto: CreateTravelPlanDto): Promise<TravelPlan>;
    findAll(): Promise<TravelPlan[]>;
    findOne(id: string): Promise<TravelPlan>;
    remove(id: string): Promise<void>;
    addExpense(planId: string, dto: CreateExpenseDto): Promise<TravelPlanDocument>;
}
