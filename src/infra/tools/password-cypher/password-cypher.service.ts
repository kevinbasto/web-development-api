import { Injectable } from '@nestjs/common';
import { PasswordCypher } from '../../../core/ports/password-cypher.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordCypherService implements PasswordCypher {

    constructor() {}

    async signPassword(password: string) : Promise<string> {
        const saltRounds = 10;
        let salt;
        await bcrypt.genSalt(saltRounds).then(genSalt => salt = genSalt).catch(error => {throw error});
        await bcrypt.hash(password, salt).then(hash => password = hash).catch(error => {throw error});
        return password;
    }

    verifyPassword(password : string, hashedPassword : string) : boolean {
        let isPasswordGenerated : boolean = bcrypt.compareSync(password, hashedPassword);
        return isPasswordGenerated;
    }
}
