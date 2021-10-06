import { Subject } from 'rxjs';
import { text } from 'stream/consumers';
import { EmailDto } from '../../../../dto/email-dto';
import { CredentialsHandler } from '../../../../ports/credentials-handler.interface';
import { EmailSender } from '../../../../ports/email-sender.interface';
import { TemplateLoader } from '../../../../ports/template-loader.interface';
import { Translater } from '../../../../ports/translater.interface';
import { SendVerificationEmailMessages } from './send-verification-email.messages';

export class SendVerificationEmail {
  constructor(
    private templateLoader: TemplateLoader,
    private emailSender: EmailSender,
    private translater: Translater,
    private credentialsHandler: CredentialsHandler,
  ) {}

  /**
   * Sends the activation email
   * @param activationToken 
   * @param email 
   * @param lang 
   */
  async sendEmail(activationToken : string, email : string, lang : string) {
    let mail : EmailDto = await this.assemblyEmailContent(activationToken, email, lang);
    await this.emailSender.sendEmail(mail);
  }

  private async assemblyEmailContent(activationToken, email, lang) : Promise<EmailDto> {
    let template = await this.templateLoader.loadTemplate('verification');
    let params = {
        header : await this.translater.getTranslation(lang, SendVerificationEmailMessages.ACTIVATION_EMAIL_SUBJECT),
        content : await this.translater.getTranslation(lang, SendVerificationEmailMessages.ACTIVATION_EMAIL_CONTENT),
        activationLink : `${this.credentialsHandler.loadCredential('CLIENT_LINK')}/auth/verify/${activationToken}`
    }
    let mailHtml = this.templateLoader.processTemplateWithContent(template, params);
    return {
        from: this.credentialsHandler.loadCredential('AUTHOR_EMAIL'),
        subject: params.header,
        text: 'lorem',
        html: mailHtml,
        to: email
    }
  }

}
