import { Test, TestingModule } from '@nestjs/testing';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { ToolsModule } from '../../../../tools/tools.module';
import { CreatePrivacyRepoService } from './create-privacy-repo.service';

describe('CreatePrivacyRepoService', () => {
  let service: CreatePrivacyRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePrivacyRepoService],
      imports: [ToolsModule]
    }).compile();

    service = module.get<CreatePrivacyRepoService>(CreatePrivacyRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a privacy terms publication', async() => {
    let terms : PrivacyDto = {
      title: "Aviso de privacidad",
      date : "dec 31, 2021",
      content: [
        "lorem ipsum dolor sit amet consectetur adipicising elit",
        "eliat von ipsum corel sau",
        "raise your flag the only one",
        "don't look back",
        "don't let me down"
      ]
    }
    let lang : string = "en";
    try {
      await service.createPrivacyTerms(lang, terms);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })
});
