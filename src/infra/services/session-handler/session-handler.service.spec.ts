import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from '../services.module';
import { jwtSecret } from './jwtSecret';
import { SessionHandlerService } from './session-handler.service';

describe('SessionHandlerService', () => {
  let service: SessionHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionHandlerService],
      imports : [JwtModule.register({
        secret : jwtSecret,
        signOptions: { expiresIn: '60m' }
      }),]
    }).compile();

    service = module.get<SessionHandlerService>(SessionHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
