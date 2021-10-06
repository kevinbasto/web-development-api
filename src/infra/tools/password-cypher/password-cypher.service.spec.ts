import { Test, TestingModule } from '@nestjs/testing';
import { PasswordCypherService } from './password-cypher.service';

describe('PasswordCypherService', () => {
  let service: PasswordCypherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordCypherService],
    }).compile();

    service = module.get<PasswordCypherService>(PasswordCypherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
