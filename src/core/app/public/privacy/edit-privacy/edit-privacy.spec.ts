import { MockGetPrivacy } from '../../../../../testing/repos/public/privacy/mock-get-privacy';
import { MockUpdatePrivacy } from '../../../../../testing/repos/public/privacy/mock-update-privacy';
import { MockTranslater } from '../../../../../testing/tools/mock-translater';
import { EditPrivacy } from './edit-privacy';

const getPrivacyRepo = new MockGetPrivacy();
const updatePrivacyRepo = new MockUpdatePrivacy();
const translater = new MockTranslater();

const editPrivacy = new EditPrivacy(getPrivacyRepo, updatePrivacyRepo, translater);

describe('EditPrivacy', () => {
  it('should be defined', () => {
    expect(editPrivacy).toBeDefined();
  });
});
