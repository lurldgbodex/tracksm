import { ConflictException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthResponse } from './dto/auth.dto';
import { LoginRequest } from './dto/login.dto';
import { getJwtConstants } from './utils/constants';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('JWT_ACCESS_SERVICE') 
        private jwtAccess: JwtService,
        @Inject('JWT_REFRESH_SERVICE') 
        private jwtRefresh: JwtService,
        private usersService: UsersService,
        private readonly configService: ConfigService,
    ) {}

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        await this.handleUserExist(registerDto.email)
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
        });

        const tokens =  await this.generateTokens(user);

        return {
            message: 'User registered successfully',
            tokens
        }
    }

    async login(loginDto: LoginRequest): Promise<AuthResponse> {
        const user = await this.validateUser(loginDto);
        const tokens = await this.generateTokens(user);

        return {
            message: 'User authentication successful',
            tokens
        }
    }

    async refreshToken(token: RefreshDto): Promise<AuthResponse> {
        const refreshToken = token.refresh_token;
        const payload = this.jwtRefresh.verify(refreshToken);
        const user = await this.usersService.findById(payload.sub);

        if (!user || user.refreshToken !== refreshToken) {
            throw new ForbiddenException('Access denied');
        }

        const tokens = await this.generateTokens(user);

        return {
            message: 'Token refresh succcessful',
            tokens
        }
    }

    async logout(user: {sub: string; email: string}) {
        const id = user.sub;
        await this.usersService.removeRefreshToken(id);
       
        return {
            message: 'Logged out successfully'
        };
    }


    private async validateUser(req: LoginRequest ): Promise<User> {
        const user = await this.usersService.findByEmail(req.email);
        if (!user || !(await bcrypt.compare(req.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }


    private async generateTokens(user: User) {
        const payload = { email: user.email, sub: user.id }
        const jwtConstants = getJwtConstants(this.configService);

        const accessToken = this.jwtAccess.sign(payload, {
            secret: jwtConstants.accessSecret,
            expiresIn: jwtConstants.accessExpiresIn,
        });

        const refreshToken = await this.jwtRefresh.signAsync(payload, {
            secret: jwtConstants.refreshSecret,
            expiresIn: jwtConstants.refreshExpiresIn,
        });

        await this.usersService.updateRefreshToken(user, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    private async handleUserExist(email: string) {
        const user = await this.usersService.findByEmail(email);

        if (user) {
            throw new ConflictException('User with email already exists.')
        }
    }
}
