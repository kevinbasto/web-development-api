import { Injectable } from '@nestjs/common';
import { SessionHandler } from '../../../core/ports/session-handler.interface';

@Injectable()
export class SessionHandlerService implements SessionHandler{}
