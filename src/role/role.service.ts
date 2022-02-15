import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: RoleRepository
    ){}

    async getAll(): Promise<Role[]>{
        const roles = await this.roleRepository.find();

        return roles;
    }
}

