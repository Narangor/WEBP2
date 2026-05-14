import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RestCountriesProvider {
  constructor(private readonly httpService: HttpService) {}

  async fetchByAlpha3(alpha3Code: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://restcountries.com/v3.1/alpha/${alpha3Code}`,
      ),
    );
    return response.data[0];
  }
}
