import { EmailDto } from "../dto/generic/email-dto";

export interface EmailSender {
    sendEmail(email : EmailDto) : Promise<any>;
}
