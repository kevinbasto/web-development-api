import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controllers/controllers.module';

@Module({
  imports: [ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
