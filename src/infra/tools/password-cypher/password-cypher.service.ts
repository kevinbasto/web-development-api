import { Injectable } from '@nestjs/common';
import { PasswordCypher } from '../../../core/ports/password-cypher.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordCypherService implements PasswordCypher {

    constructor() {}

    async signPassword(password: string) : Promise<string> {
        try {
            const saltRounds = 10;
            let salt;
            await bcrypt.genSalt(saltRounds).then(genSalt => salt = genSalt);
            await bcrypt.hash(password, salt).then(hash => password = hash);
            return password;
        } catch (error) {
            throw error;
        }
    }

    verifyPassword(password : string, hashedPassword : string) : boolean {
        let isPasswordGenerated : boolean = bcrypt.compareSync(password, hashedPassword);
        return isPasswordGenerated;
    }
}
