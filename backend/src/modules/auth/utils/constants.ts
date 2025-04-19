import { ConfigService } from "@nestjs/config"

export const getJwtConstants = (config: ConfigService) => ({
    accessSecret: config.get<string>('app.jwt.access.secret'),
    accessExpiresIn: config.get<string>('app.jwt.access.expireIn') || '1d',
    refreshSecret: config.get<string>('app.jwt.refresh.secret'),
    refreshExpiresIn: config.get<string>('app.jwt.refresh.expiresIn') || '7d',
});