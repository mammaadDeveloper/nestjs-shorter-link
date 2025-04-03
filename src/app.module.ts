import { Module } from '@nestjs/common';
import { LinkModule } from './modules/link/link.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        type: ConfigService.get<'postgres' | 'mysql'>('database.type'),
        url: ConfigService.get<string>('database.url'),
        entities: ConfigService.get<string[]>('database.entities'),
        synchronize: ConfigService.get<boolean>('database.synchronize')
      })
    }),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
