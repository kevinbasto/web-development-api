import { Module } from '@nestjs/common';
import { ToolsModule } from '../tools/tools.module';

@Module({
  providers: [],
  imports: [ToolsModule]
})
export class GuardsModule {}
