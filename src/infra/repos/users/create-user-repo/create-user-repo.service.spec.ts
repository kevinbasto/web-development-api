import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../../core/instances/auth/user';
import { CreateUserRepoService } from './create-user-repo.service';
import * as crypto from 'crypto';
import { ToolsModule } from '../../../tools/tools.module';

const user : User = {
  name : "john",
  userId : ""
}
const lang : string = "en";
const accountId = "test"

describe('CreateUserRepoService', () => {
  let createUserRepoService: CreateUserRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserRepoService],
      imports: [ToolsModule]
    }).compile();

    createUserRepoService = module.get<CreateUserRepoService>(CreateUserRepoService);
  });

  it('should be defined', () => {
    expect(createUserRepoService).toBeDefined();
  });

  it('should create a new user', async() => {
    let newUser = { ...user};
    newUser.userId = crypto.createHash("sha512").update(JSON.stringify(newUser)).digest("hex");
    try {
      await createUserRepoService.createUser(lang, newUser, accountId);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  })
});
