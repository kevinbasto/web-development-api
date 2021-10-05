import { Module } from '@nestjs/common';
import { ControllersModule } from './infra/controllers/controllers.module';
import { ToolsModule } from './infra/services/tools.module';
import { ReposModule } from './infra/repos/repos.module';
import { GuardsModule } from './infra/guards/guards.module';

@Module({
  imports: [
    ControllersModule, 
    ToolsModule, 
    ReposModule, 
    GuardsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
