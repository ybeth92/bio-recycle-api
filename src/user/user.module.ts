import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { RoleRepository } from 'src/role/role.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, RoleRepository, UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
