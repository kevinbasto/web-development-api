import { EmailDto } from "../../../dto/generic/email-dto";
import { CredentialsHandler } from "../../../ports/credentials-handler.interface";
import { EmailSender } from "../../../ports/email-sender.interface";
import { TemplateLoader } from "../../../ports/template-loader.interface";

export class EmailSend {
    constructor(
        protected templateManager : TemplateLoader,
        protected credentialsManager : CredentialsHandler,
        protected emailSender : EmailSender
    ){}

    async sendEmail(destiny : string, template : string, subject : string, params : any) : Promise<void>{
        try {
            let rawTemplate : string = this.loadTemplate(template);
            let processedTemplate = this.processTemplate(rawTemplate, params);
            await this.deliver(destiny, processedTemplate, subject, params);
        } catch (error) {
            throw error;
        }
        return;
    }

    private loadTemplate(template : string) : string {
        let rawTemplate;
        try {
            rawTemplate = this.templateManager.loadTemplate(template);
        } catch (error) {
            throw error;
        }
        return rawTemplate
    }

    private processTemplate(template : string, params : any) : string{
        let processedTemplate : string;
        try {
            processedTemplate = this.templateManager.processTemplateWithContent(template, params);
        } catch (error) {
            throw error;
        }
        return processedTemplate;
    }

    private async deliver(destiny : string, processedTemplate: string, subject :string, params : any) : Promise<void>{
        let email : EmailDto = {
            from : this.credentialsManager.loadCredential("AUTHOR_EMAIL"),
            subject : subject,
            text : "string for delivering",
            html : processedTemplate,
            to: destiny
        }
        try {
            await this.emailSender.sendEmail(email)
            return;
        } catch (error) {
            throw error;
        }
    }
}
