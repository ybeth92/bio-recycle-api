import { User } from "src/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleName } from "../utils/enum/role.enum";

@Entity({name: 'roles'})
export class Role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:40, nullable: false, unique: true})
    name: RoleName;

    @OneToMany(type => User, user => user.role)
    users: User[];
}