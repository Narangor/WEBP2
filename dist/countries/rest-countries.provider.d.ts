import { HttpService } from '@nestjs/axios';
export declare class RestCountriesProvider {
    private readonly httpService;
    constructor(httpService: HttpService);
    fetchByAlpha3(alpha3Code: string): Promise<any>;
}
