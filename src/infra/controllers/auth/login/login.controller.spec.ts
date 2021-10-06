import { Test, TestingModule } from '@nestjs/testing';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../tools/tools.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ToolsModule, ReposModule],
      controllers: [LoginController],
      providers: [LoginService]
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
