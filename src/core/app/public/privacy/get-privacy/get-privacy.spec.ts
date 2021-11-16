import { MockGetPrivacy } from '../../../../../testing/repos/public/privacy/mock-get-privacy';
import { PrivacyDto } from '../../../../dto/public/privacy';
import { PrivacyNoticeNotFoundException } from '../../../../exceptions/privacy/privacy-notice-not-found.exception';
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
  });

  it('should fetch by id', async() => {
    try {
      let privacyid = "test";
      let privacy : PrivacyDto = await getPrivacy.getPrivacyPolicyById("en", privacyid);
      expect(privacy).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should throw not found error', async()=> {
    try {
      let privacyid = "notfound";
      let privacy : PrivacyDto = await getPrivacy.getPrivacyPolicyById("en", privacyid);
    } catch (error) {
      expect(error).toBeInstanceOf(PrivacyNoticeNotFoundException)
    }
  })
});
