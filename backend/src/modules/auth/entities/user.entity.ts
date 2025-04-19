import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, Index } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Index({ unique: true})
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, name: 'refresh_token' })
    refreshToken?: string;
}