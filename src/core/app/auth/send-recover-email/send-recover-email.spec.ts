import { CredentialHandlerService } from '../../../../infra/tools/credential-handler/credential-handler.service';
import { EmailSenderService } from '../../../../infra/tools/email-sender/email-sender.service';
import { TemplateLoaderService } from '../../../../infra/tools/template-loader/template-loader.service';
import { MockTranslater } from '../../../../testing/tools/mock-translater';
import { SendRecoverEmail } from './send-recover-email';

const translater = new MockTranslater();
const credentialsHandler = new CredentialHandlerService();
const emailSender = new EmailSenderService();
const templateLoader = new TemplateLoaderService();

const sendRecoverEmail = new SendRecoverEmail(translater, credentialsHandler, emailSender, templateLoader)

describe('SendRecoverEmail', () => {
  it('should be defined', () => {
    expect(sendRecoverEmail).toBeDefined();
  });
});
