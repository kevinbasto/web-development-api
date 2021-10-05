import { Module } from '@nestjs/common';
import { ToolsModule } from '../services/tools.module';

@Module({
  providers: [],
  imports: [ToolsModule]
})
export class GuardsModule {}
