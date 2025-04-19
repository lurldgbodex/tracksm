import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('app.database.host'),
                port: configService.get<number>('app.database.port'),
                username: configService.get<string>('app.database.username'),
                password: configService.get<string>('app.database.password'),
                database: configService.get<string>('app.database.database'),
                autoLoadEntities: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: process.env.NODE_ENV !== 'production',
                namingStrategy: new SnakeNamingStrategy(),
                logging: process.env.NODE_ENV === 'development',
            }),
            inject: [ConfigService],
        })
    ]
})
export class DatabaseModule {}
