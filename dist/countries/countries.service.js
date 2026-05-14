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
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const country_schema_1 = require("./schemas/country.schema");
const rest_countries_provider_1 = require("./rest-countries.provider");
let CountriesService = class CountriesService {
    countryModel;
    restCountriesProvider;
    constructor(countryModel, restCountriesProvider) {
        this.countryModel = countryModel;
        this.restCountriesProvider = restCountriesProvider;
    }
    async findOrFetch(alpha3Code) {
        const existing = await this.countryModel.findOne({ alpha3Code }).exec();
        if (existing)
            return existing;
        let data;
        try {
            data = await this.restCountriesProvider.fetchByAlpha3(alpha3Code);
        }
        catch {
            throw new common_1.NotFoundException(`Country with code '${alpha3Code}' not found`);
        }
        if (!data) {
            throw new common_1.NotFoundException(`Country with code '${alpha3Code}' not found`);
        }
        const country = new this.countryModel({
            alpha3Code,
            name: data.name?.common ?? '',
            region: data.region ?? '',
            capital: data.capital?.[0] ?? '',
            population: data.population ?? 0,
            flagUrl: data.flags?.png ?? '',
        });
        return country.save();
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(country_schema_1.Country.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        rest_countries_provider_1.RestCountriesProvider])
], CountriesService);
//# sourceMappingURL=countries.service.js.map