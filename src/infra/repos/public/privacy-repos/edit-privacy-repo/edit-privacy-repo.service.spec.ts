import { Test, TestingModule } from '@nestjs/testing';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { ToolsModule } from '../../../../tools/tools.module';
import { EditPrivacyRepoService } from './edit-privacy-repo.service';

describe('EditPrivacyRepoService', () => {
  let service: EditPrivacyRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports : [ToolsModule],
      providers: [EditPrivacyRepoService],
    }).compile();

    service = module.get<EditPrivacyRepoService>(EditPrivacyRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should edit a post successfully', async () => {
    try {
      let privacy : PrivacyDto = {
        title : "actualización del aviso de privacidad",
        date : "dec 1, 2021",
        content: [
          "we came a romans",
          "no mercy",
          "testing for the testy test"
        ]
      }
      let privacyId : string = "373ad2fea10dde9c2ec5521db4d7093820a26d1dda119735a39932b639121cf4be794e00da389ff6ed8b304f80060252d762f0454efa666653b5c0c0b0807384";
      await service.updatePrivacyTerms("en", privacyId, privacy)
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })

});
