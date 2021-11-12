import { MockGetPrivacy } from '../../../../../testing/repos/public/privacy/mock-get-privacy';
import { PrivacyDto } from '../../../../dto/public/privacy';
import { GetPrivacy } from './get-privacy';

const getPrivacyRepo = new MockGetPrivacy();
const getPrivacy = new GetPrivacy(getPrivacyRepo);

describe('GetPrivacy', () => {
  it('should be defined', () => {
    expect(getPrivacy).toBeDefined();
  });

  it('should fetch the last privacy policies', async() => {
    try {
      let privacy : PrivacyDto = await getPrivacy.getCurrentPrivacy("en");
      expect(privacy).toBeDefined;
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })
});
