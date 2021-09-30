import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controllers/controllers.module';
import { ServicesModule } from './infra/services/services.module';
import { ReposModule } from './infra/repos/repos.module';

@Module({
  imports: [ControllersModule, ServicesModule, ReposModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
