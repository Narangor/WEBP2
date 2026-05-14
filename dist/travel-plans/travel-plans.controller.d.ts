import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
export declare class TravelPlansController {
    private readonly travelPlansService;
    constructor(travelPlansService: TravelPlansService);
    create(dto: CreateTravelPlanDto): Promise<import("./schemas/travel-plan.schema").TravelPlan>;
    findAll(): Promise<import("./schemas/travel-plan.schema").TravelPlan[]>;
    findOne(id: string): Promise<import("./schemas/travel-plan.schema").TravelPlan>;
    remove(id: string): Promise<void>;
}
