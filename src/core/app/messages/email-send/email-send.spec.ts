import { CredentialHandlerService } from '../../../../infra/tools/credential-handler/credential-handler.service';
import { EmailSenderService } from '../../../../infra/tools/email-sender/email-sender.service';
import { TemplateLoaderService } from '../../../../infra/tools/template-loader/template-loader.service';
import { EmailSend } from './email-send';

const templateLoader = new TemplateLoaderService();
const credentialsHandler = new CredentialHandlerService();
const emailSender = new EmailSenderService();

const emailSend = new EmailSend(templateLoader, credentialsHandler, emailSender)

describe('EmailSend', () => {
  it('should be defined', () => {
    expect(emailSend).toBeDefined();
  });

  it('should send the email', async() => {
    try {
      let destiny  : string = "kevin.basto@mexcoders.com";
      let template : string = "test";
      let subject  : string = "test email";
      let params = { message : "this is a test email, for the sake of testing email" };
      await emailSend.sendEmail(destiny, template, subject, params);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should reject the petition due to template not existing', async() => {
    try {
      let destiny  : string = "kevin.basto@mexcoders.com";
      let template : string = "testNotExisting";
      let subject  : string = "test email";
      let params = { message : "this is a test email, for the sake of testing email" };
      await emailSend.sendEmail(destiny, template, subject, params);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});
