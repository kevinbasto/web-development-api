import { UuidGeneratorService } from '../../../../infra/tools/uuid-generator/uuid-generator.service';
import { MockCreatePrivacy } from '../../../../testing/repos/public/privacy/mock-create-privacy';
import { MockTranslater } from '../../../../testing/tools/mock-translater';
import { CreatePrivacy } from './create-privacy';

const uuidGenerator = new UuidGeneratorService();
const createPrivacyRepo = new MockCreatePrivacy();
const translater = new MockTranslater();

describe('CreatePrivacy', () => {
  it('should be defined', () => {
    expect(new CreatePrivacy(uuidGenerator, createPrivacyRepo, translater)).toBeDefined();
  });
});
