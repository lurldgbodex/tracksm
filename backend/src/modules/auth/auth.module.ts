import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UsersModule } from '../users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenJwtProvider, RefreshTokenJwtProvider } from './utils/jwt.providers';

@Module({
  imports: [ UsersModule, PassportModule, ConfigModule ],
  providers: [
    AuthService, 
    JwtStrategy, 
    JwtRefreshStrategy, 
    AccessTokenJwtProvider, 
    RefreshTokenJwtProvider
  ],
  controllers: [AuthController]
})
export class AuthModule {}
