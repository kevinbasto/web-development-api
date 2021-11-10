import { CredentialHandlerService } from '../../../../infra/tools/credential-handler/credential-handler.service';
import { EmailSenderService } from '../../../../infra/tools/email-sender/email-sender.service';
import { TemplateLoaderService } from '../../../../infra/tools/template-loader/template-loader.service';
import { MockTranslater } from '../../../../testing/tools/mock-translater';
import { SendVerificationEmail } from './send-verification-email';

const translater = new MockTranslater();
const credentialsHandler = new CredentialHandlerService();
const emailSender = new EmailSenderService();
const templateLoader = new TemplateLoaderService();

const sendVerificationEmail = new SendVerificationEmail(translater, credentialsHandler, emailSender, templateLoader);

describe('SendVerificationEmail', () => {
  it('should be defined', () => {
    expect(sendVerificationEmail).toBeDefined();
  });
});
