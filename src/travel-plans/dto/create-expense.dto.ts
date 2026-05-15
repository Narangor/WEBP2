import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
    description: string;

    @IsNumber()
    @IsPositive({ message: 'El monto debe ser positivo.' })
    amount: number;

    @IsString()
    @IsNotEmpty()
    category: string;
}