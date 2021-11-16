import { MockDeletePrivacy } from '../../../../../testing/repos/public/privacy/mock-delete-privacy';
import { MockGetPrivacy } from '../../../../../testing/repos/public/privacy/mock-get-privacy';
import { MockTranslater } from '../../../../../testing/tools/mock-translater';
import { PrivacyNoticeNotFoundException } from '../../../../exceptions/privacy/privacy-notice-not-found.exception';
import { DeletePrivacy } from './delete-privacy';

const mockGetter = new MockGetPrivacy();
const mockdeleter = new MockDeletePrivacy();
const translater = new MockTranslater();

const deletePrivacy = new DeletePrivacy(mockGetter, mockdeleter, translater)

describe('DeletePrivacy', () => {
  it('should be defined', () => {
    expect(deletePrivacy).toBeDefined();
  });

  it('should delete the id', async() => {
    let termsId = "test";
    try {
      await deletePrivacy.deletePrivacyNotice(termsId, "en");
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should return a privacy not found error notice', async() => {
    let privacyNoticeId = "nonexisting";
    try {
      await deletePrivacy.deletePrivacyNotice(privacyNoticeId, "en");
    } catch (error) {
      expect(error).toBeInstanceOf(PrivacyNoticeNotFoundException)
    }
  });
});
