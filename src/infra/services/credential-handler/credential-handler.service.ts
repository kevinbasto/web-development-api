import { Injectable } from '@nestjs/common';
import { CredentialsHandler } from '../../../core/ports/credentials-handler.interface';
import * as dotenv from 'dotenv'

@Injectable()
export class CredentialHandlerService implements CredentialsHandler{
    loadCredential(credential : string) : string{
        dotenv.config();
        return process.env[credential];
    }
}
