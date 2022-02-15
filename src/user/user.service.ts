import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from 'src/role/role.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export interface UserInterface {
  id?: number;
  email?: string;
  username?: string;
}

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new User();
    const idRole = 2;
    const users = await this.userRepository.find();
    const role = await this.roleRepository.findOne(idRole);
    //const city = await this.cityService.findById(dto.city);

    newUser.name = dto.name;
    newUser.lastName = dto.lastName;
    newUser.mothersLastName = dto.mothersLastName;

    let dni = users.find(user => user.dni == dto.dni);
    if (dni) {
      throw new NotFoundException('Dni ya existe')
    } else {
      newUser.dni = dto.dni;
    }
    
    newUser.email = dto.email;
    newUser.phone = dto.phone;
    newUser.password = dto.password;
    newUser.isActive = true;
    newUser.role = role;
    newUser.adress = dto.adress;
    //newUser.city = city;
    newUser.point = 0;

    const user = await this.userRepository.save(newUser);
    delete user.password;

    return user;
  }

  async findById(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ id: id })
      .innerJoinAndSelect('user.role', 'role')
      .getOne();
  }

  async findByEmail(data: UserInterface) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ email: data.email })
      .addSelect('user.password')
      .innerJoinAndSelect('user.role', 'role')
      .getOne();
  }

  async findByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne({ phone });
  }
}

