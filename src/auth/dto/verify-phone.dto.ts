import { IsNotEmpty } from "class-validator";

export class VerifyPhoneDto{

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    code: number;
}