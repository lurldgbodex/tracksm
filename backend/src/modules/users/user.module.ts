import { Module } from "@nestjs/common";
import { UsersService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../auth/entities/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule {}