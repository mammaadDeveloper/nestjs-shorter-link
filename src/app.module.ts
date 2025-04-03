import { Module } from '@nestjs/common';
import { LinkModule } from './modules/link/link.module';

@Module({
  imports: [LinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
