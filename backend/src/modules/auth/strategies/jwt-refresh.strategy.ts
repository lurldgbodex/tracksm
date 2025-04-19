import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies.refresh_token,
            ]),
            secretOrKey: config.get<string>('app.jwt.refresh.secret') || '',
            passReqToCallback: true,
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}