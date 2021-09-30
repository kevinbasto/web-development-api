import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controllers/controllers.module';
import { ServicesModule } from './infra/services/services.module';

@Module({
  imports: [ControllersModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
