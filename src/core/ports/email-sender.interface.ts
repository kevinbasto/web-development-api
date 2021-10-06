import { EmailDto } from "../dto/email-dto";

export interface EmailSender {
    sendEmail(email : EmailDto) : Promise<any>;
}
