import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constans';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy, JwtStrategy } from './strategies';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
  UserRepository,
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>(JWT_SECRET)
    }),
    inject: [ConfigService]
  }),
  UserModule
],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

