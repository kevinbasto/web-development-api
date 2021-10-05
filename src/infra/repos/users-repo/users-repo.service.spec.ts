import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from '../../services/services.module';
import { UsersRepoService } from './users-repo.service';

describe('UsersRepoService', () => {
  let service: UsersRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepoService],
      imports: [ServicesModule]
    }).compile();

    service = module.get<UsersRepoService>(UsersRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    try{
      service.createUser("testfate")
    }catch(exception){
      console.log(exception);
      expect(exception).toBeUndefined();
    }
  });
});
