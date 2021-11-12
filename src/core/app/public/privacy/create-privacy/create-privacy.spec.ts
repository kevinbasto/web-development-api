import { UuidGeneratorService } from '../../../../infra/tools/uuid-generator/uuid-generator.service';
import { MockCreatePrivacy } from '../../../../testing/repos/public/privacy/mock-create-privacy';
import { MockTranslater } from '../../../../testing/tools/mock-translater';
import { PrivacyDto } from '../../../dto/public/privacy';
import { CreatePrivacy } from './create-privacy';

const uuidGenerator = new UuidGeneratorService();
const createPrivacyRepo = new MockCreatePrivacy();
const translater = new MockTranslater();
const privacyPolicies = new CreatePrivacy(uuidGenerator, createPrivacyRepo, translater);

describe('CreatePrivacy', () => {
  it('should be defined', () => {
    expect(privacyPolicies).toBeDefined();
  });

  it('should create the repo and return a success message', async() =>{ 
    let privacy : PrivacyDto = {
      title : "Uso de datos",
      date: "jan 1, 2022",
      content: [
        "lorem ipsum dolor sit amet",
        "consectetur adipicising elit",
        "et quam ipsum anaero titilantus"
      ]
    };

    try {
      let message = await privacyPolicies.createPrivacyTerms("en", privacy);
      expect(message).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })
});
