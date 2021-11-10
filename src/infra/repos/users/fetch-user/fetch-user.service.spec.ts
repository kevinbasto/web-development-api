import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../../core/instances/auth/user';
import { ToolsModule } from '../../../tools/tools.module';
import { FetchUserService } from './fetch-user.service';

describe('FetchUserService', () => {
  let service: FetchUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchUserService],
      imports: [ToolsModule]
    }).compile();

    service = module.get<FetchUserService>(FetchUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch a user', async() => {
    try {
      let email : string = "test@test.com";
      let lang : string = "en";
      let user : User = await service.fetchUserWithEmail(lang, email);
      expect(user).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })
});
