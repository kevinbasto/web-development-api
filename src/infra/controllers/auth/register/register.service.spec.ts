import { Test, TestingModule } from '@nestjs/testing';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../tools/tools.module';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports : [ ToolsModule, ReposModule ],
      providers: [RegisterService],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
