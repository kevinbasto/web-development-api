import { Test, TestingModule } from '@nestjs/testing';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { ToolsModule } from '../../../../tools/tools.module';
import { GetPrivacyRepoService } from './get-privacy-repo.service';

describe('GetPrivacyRepoService', () => {
  let service: GetPrivacyRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPrivacyRepoService],
      imports: [ ToolsModule ]
    }).compile();

    service = module.get<GetPrivacyRepoService>(GetPrivacyRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch the last privacy policies', async () => {
    let lang : string = "en";
    try {
      let privacyPolicies : PrivacyDto =await service.getCurrentTerms(lang);
      expect(privacyPolicies).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })
});
