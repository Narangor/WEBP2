import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { RestCountriesProvider } from './rest-countries.provider';
export declare class CountriesService {
    private countryModel;
    private readonly restCountriesProvider;
    constructor(countryModel: Model<CountryDocument>, restCountriesProvider: RestCountriesProvider);
    findOrFetch(alpha3Code: string): Promise<Country>;
}
