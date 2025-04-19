import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "../auth/dto/register.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository
        (User) private repo: Repository<User>
    ) {}

    async findByEmail(email: string) {
        return await this.repo.findOne({ where: { email } });
    }

    async findById(id: string) {
        return await this.repo.findOne({ where: { id } });
    }

    async createUser(userInfo: RegisterDto) {
        return await this.repo.save(userInfo);
    }

    async updateRefreshToken(user: User, token: string) {
        user.refreshToken = token;
        return await this.repo.save(user);
    }

    async removeRefreshToken (userId: string) {
        const user = await this.findById(userId);
        if (user) {
            user.refreshToken = undefined;
            return await this.repo.save(user);
        }
    }
}