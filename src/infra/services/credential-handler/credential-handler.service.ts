import { Injectable } from '@nestjs/common';
import { CredentialsHandler } from '../../../core/ports/credentials-handler.interface';

@Injectable()
export class CredentialHandlerService implements CredentialsHandler{}
