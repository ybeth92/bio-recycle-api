import { Controller, Post, UseGuards} from '@nestjs/common';
import { Users } from 'src/common/decorator';
import { User as UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard} from './guards';
import { UserService } from 'src/user/user.service';

@Controller('/api/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Users() user: UserEntity) {
        const data = await this.authService.login(user);
        return {
            message: 'Login exitoso',
            data 
        }
    }
}

