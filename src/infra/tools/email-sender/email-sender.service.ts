import { Injectable } from '@nestjs/common';
import { EmailSender } from '../../../core/ports/email-sender.interface';
import * as sendgrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';
import { EmailDto } from '../../../core/dto/email-dto';

@Injectable()
export class EmailSenderService implements EmailSender{
    constructor() {
        this.loadKey();
    }
    
    private apikey : string;    

    async sendEmail(email : EmailDto) : Promise<any>{
        await sendgrid.setApiKey(this.apikey);
        await sendgrid.send(email)
        .then(res => { })
        .catch(error => {
            throw error;
        })

    }

    loadKey(){
        dotenv.config();
        this.apikey = process.env.SENDGRID_API_KEY
    }    
}
