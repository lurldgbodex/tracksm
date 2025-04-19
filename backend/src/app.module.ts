import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { FilesModule } from './modules/files/files.module';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], 
      isGlobal: true
    }),
    AuthModule, 
    TasksModule, 
    AnalyticsModule, 
    FilesModule, 
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
