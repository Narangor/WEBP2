import { IsString, IsNotEmpty, IsDateString, Length, Matches, IsMongoId } from 'class-validator';

export class CreateTravelPlanDto {

  @IsMongoId({ message: 'userId debe ser un ObjectId válido.' })
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/, {
    message: 'destinationCountryCode must be exactly 3 uppercase letters (e.g. COL)',
  })
  destinationCountryCode: string;


}
