import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { CredentialsHandler } from "../../../ports/credentials-handler.interface";
import { EmailSender } from "../../../ports/email-sender.interface";
import { TemplateLoader } from "../../../ports/template-loader.interface";
import { Translater } from "../../../ports/translater.interface";
import { EmailSend } from "../../messages/email-send/email-send";

export class SendRecoverEmail extends EmailSend{
    constructor(
        private translater : Translater,
        credentialsHandler : CredentialsHandler,
        emailSender : EmailSender,
        templateLoader : TemplateLoader
    ) {
        super(templateLoader, credentialsHandler, emailSender);
    }

    sendRecoverEmail(lang : string, email : string, token : string) : Promise<SystemMessage>{
        return new Promise<SystemMessage>(async (resolve, reject) => {
            try {
                let params = await this.assembleParams(lang, token);
                let subject : string = "Recover your account";
                let template : string = "recover"
                await this.sendEmail(email, template, subject, params);
                resolve(await this.getSuccessMessage(lang));
            } catch (error) {
                reject(error);
            }
        });
    }

    private async assembleParams(lang : string, token : string) : Promise<any>{
        let greetings = await this.translater.getTranslation(lang, "recover.GREETINGS");
        let message = await this.translater.getTranslation(lang, "recover.MESSAGE");
        let clientUrl = this.credentialsManager.loadCredential("CLIENT_URL");
        return {
            greetings: greetings,
            message : message,
            verificationUrl : `${clientUrl}/auth/change/${token}`
        }
    }

    private async getSuccessMessage(lang : string) : Promise<SystemMessage>{
        let name : string = await this.translater.getTranslation(lang, "recover.SUCCESS_NAME");
        let message : string = await this.translater.getTranslation(lang, "recover.SUCCESS_MESSAGE");
        return {
            name : name,
            message: message
        }
    }
}
