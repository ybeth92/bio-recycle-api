import { hash } from "bcryptjs";
//import { City } from "src/city/city.entity";
//import { Exchange } from "src/exchange/exchange.entity";
import { Role } from "src/role/role.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    lastName: string;

    @Column({ type: 'varchar', length: 40, nullable: false })
    mothersLastName: string;

    @Column({ type: 'varchar', length: 8, nullable: false, unique: true })
    dni: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false })
    password: string;

    @Column({ type: 'varchar', length: 9, nullable: false, unique: true })
    phone: string;

    @CreateDateColumn({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP(6)', nullable: true })
    updatedAt: Date;

    @Column({ type: 'bool', default: true, nullable: false })
    isActive: boolean;

    @Column({ type: 'varchar', length: 250, nullable: false })
    adress: string;

    // @ManyToOne(() => City, city => city.users)
    // @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
    // city: City;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
    role: Role;

    @Column({type: 'int'})
    point: number;

    // @OneToMany(type => Exchange, exchange => exchange.user)
    // exchanges: Exchange[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) { return; }
        this.password = await hash(this.password, 10);
    }
}
