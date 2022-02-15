import { IsBooleanString, IsEnum, IsString, MaxLength, MinLength } from "class-validator";


export class CreateAuthDto{
    
    @IsString()
    @MaxLength(40, {message: 'longitud máxima de 40'})
    name: string;

    @IsString()
    @MaxLength(40, {message: 'longitud máxima de 40'})
    lastname: string;

    @IsString()
    @MaxLength(40, {message: 'longitud máxima de 40'})
    mothersLastName: string;

    @IsString()
    @MaxLength(8, {message: 'longitud máxima de 8'})
    dni: string;

    @IsString()
    @MinLength(6, {message: 'longitud mínima de 6'})
    password: string;

    @IsString()
    @MaxLength(9, {message: 'longitud máxima de 9'})
    phone: string;

    createdAt: Date;

    @IsBooleanString()
    isActive: boolean;
}