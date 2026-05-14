import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { RestCountriesProvider } from './rest-countries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
    private readonly restCountriesProvider: RestCountriesProvider,
  ) {}

  async findOrFetch(alpha3Code: string): Promise<Country> {
    const existing = await this.countryModel.findOne({ alpha3Code }).exec();
    if (existing) return existing;

    let data: any;
    try {
      data = await this.restCountriesProvider.fetchByAlpha3(alpha3Code);
    } catch {
      throw new NotFoundException(`Country with code '${alpha3Code}' not found`);
    }

    if (!data) {
      throw new NotFoundException(`Country with code '${alpha3Code}' not found`);
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
}
