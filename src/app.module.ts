import { Module } from '@nestjs/common';
import { LinkModule } from './modules/link/link.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig]
    }),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
