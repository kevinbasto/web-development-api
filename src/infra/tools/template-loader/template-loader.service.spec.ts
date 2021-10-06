import { Test, TestingModule } from '@nestjs/testing';
import { TemplateLoaderService } from './template-loader.service';

describe('TemplateLoaderService', () => {
  let service: TemplateLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateLoaderService],
    }).compile();

    service = module.get<TemplateLoaderService>(TemplateLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
