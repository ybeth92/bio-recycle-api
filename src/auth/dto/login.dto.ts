import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto{
    
    @IsString()
    @MaxLength(8, {message: 'longitud máxima de 8'})
    userId: string;
    
    @IsString()
    @MaxLength(8, {message: 'longitud máxima de 8'})
    @MinLength(4, {message: 'longitud mínima de 4'})
    password: string;
}