import { Injectable } from '@nestjs/common';
import { EmailSender } from '../../../core/ports/email-sender.interface';

@Injectable()
export class EmailSenderService implements EmailSender{}
