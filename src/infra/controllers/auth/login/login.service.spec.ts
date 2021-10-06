import { Test, TestingModule } from '@nestjs/testing';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../tools/tools.module';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ToolsModule, ReposModule],
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
