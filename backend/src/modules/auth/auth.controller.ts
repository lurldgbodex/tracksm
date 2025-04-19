import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.dto';
import { AuthResponse } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'user authentication successful.' })
    @ApiResponse({ status: 400, description: 'missing required login data' })
    @ApiResponse({ status: 401, description: 'authentication failed due to invalid credentials'})
    async login(@Body() loginRequest: LoginRequest): Promise<AuthResponse> {
        return await this.authService.login(loginRequest);
    }

    @Post('register')
    @ApiResponse({ status: 201, description: 'user created successfully.' })
    @ApiResponse({ status: 400, description: 'missing required data for reqgistration' })
    @ApiResponse({ status: 409, description: 'conflict due to existing record' })
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() token: RefreshDto) {
        return this.authService.refreshToken(token);
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req: Request) {
        const user = req.user as { sub: string; email: string };
        return this.authService.logout(user);
    }
}
