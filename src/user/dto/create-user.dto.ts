import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(40, {message: 'longitud máxima de 40'})
    name: string; 

    @IsNotEmpty()
    @IsString()
    @MaxLength(40, {message: 'longitud máxima de 40'})
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(40, {message: 'longitud máxima de 40'})
    mothersLastName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(8, {message: 'longitud máxima de 8'})
    dni: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {message: 'longitud máxima de 100'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4, {message: 'longitud mínima de 4'})
    password: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(9, {message: 'longitud máxima de 9'})
    phone: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(250, {message: 'longitud máxima de 250'})
    adress: string;

    @IsNotEmpty()
    city: number;
}