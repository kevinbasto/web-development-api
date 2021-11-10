import { Injectable } from '@nestjs/common';
import { TokenGenerator } from '../../../core/ports/token-generator.interface';
import * as crypto from 'crypto';

@Injectable()
export class TokenGeneratorService implements TokenGenerator {

    generateToken() : string{
        let token : string = crypto.createHash('sha512').update(crypto.randomBytes(20)).digest('hex');
        return token;
    }
}
