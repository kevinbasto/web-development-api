import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controllers/controllers.module';
import { ServicesModule } from './infra/services/services.module';
import { ReposModule } from './infra/repos/repos.module';
import { GuardsModule } from './infra/guards/guards.module';

@Module({
  imports: [ControllersModule, ServicesModule, ReposModule, GuardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
