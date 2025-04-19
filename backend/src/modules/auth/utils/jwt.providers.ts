import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { getJwtConstants } from "./constants";

export const AccessTokenJwtProvider = {
    provide: 'JWT_ACCESS_SERVICE',
    useFactory: (configService: ConfigService) => {
        const jwtConstants = getJwtConstants(configService);

        return new JwtService({
            secret: jwtConstants.accessSecret,
            signOptions: { expiresIn: jwtConstants.accessExpiresIn },
        });
    },
    inject: [ConfigService],
};

export const RefreshTokenJwtProvider = {
    provide: 'JWT_REFRESH_SERVICE',
    useFactory: (configService: ConfigService) => {
        const jwtConstants = getJwtConstants(configService);

        return new JwtService({
            secret: jwtConstants.refreshSecret,
            signOptions: { expiresIn: jwtConstants.refreshExpiresIn },
        });
    },
    inject: [ConfigService],
};