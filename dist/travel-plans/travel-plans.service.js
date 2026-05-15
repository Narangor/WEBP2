"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPlansService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const travel_plan_schema_1 = require("./schemas/travel-plan.schema");
const countries_service_1 = require("../countries/countries.service");
const users_service_1 = require("../users/users.service");
let TravelPlansService = class TravelPlansService {
    travelPlanModel;
    countriesService;
    usersService;
    constructor(travelPlanModel, countriesService, usersService) {
        this.travelPlanModel = travelPlanModel;
        this.countriesService = countriesService;
        this.usersService = usersService;
    }
    async create(dto) {
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
    async findAll() {
        return this.travelPlanModel.find().exec();
    }
    async findOne(id) {
        const plan = await this.travelPlanModel.findById(id).exec();
        if (!plan)
            throw new common_1.NotFoundException(`Travel plan '${id}' not found`);
        return plan;
    }
    async remove(id) {
        const result = await this.travelPlanModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException(`Travel plan '${id}' not found`);
    }
    async addExpense(planId, dto) {
        const plan = await this.travelPlanModel.findByIdAndUpdate(planId, { $push: { expenses: dto } }, { new: true }).exec();
        if (!plan)
            throw new common_1.NotFoundException(`Plan ${planId} no encontrado.`);
        return plan;
    }
};
exports.TravelPlansService = TravelPlansService;
exports.TravelPlansService = TravelPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(travel_plan_schema_1.TravelPlan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        countries_service_1.CountriesService,
        users_service_1.UsersService])
], TravelPlansService);
//# sourceMappingURL=travel-plans.service.js.map