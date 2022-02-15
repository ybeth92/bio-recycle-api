import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { messages } from 'src/lib/constanst';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { TokenDto } from './dto/token.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { PayloadInterface } from './interface/payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail({ email: email });
        if (!user.isActive) throw new UnauthorizedException(messages.userInactive);
        if (user && await compare(password, user.password)) {
            const { password, ...rest } = user
            return rest;
        }
        return null;
    }

    async login(user: User) {
        const { id, ...rest } = user;
        const payload: PayloadInterface = { role: user.role, id: user.id };
        
        const accessToken = this.jwtService.sign(payload);
        
        const response = {
            id,
            ...rest,
            accessToken
        }
        return response;
    }
}