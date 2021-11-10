import { SessionDto } from "../../core/dto/auth/session-dto";
import { SessionHandler } from "../../core/ports/session-handler.interface";
import * as crypto from 'crypto'

export class MockSessionHandler implements SessionHandler{
    signSession(payload : Object) : SessionDto {
        return {
            accessToken : crypto.createHash("md5").update(JSON.stringify(payload)).digest("hex"),
            refreshToken: crypto.createHash("md5").update(JSON.stringify(payload)).digest("hex"),
        }
    }

    async verifySession(session : string) : Promise<any> {
        return true;
    }

    async verifyrefreshToken(token : string) : Promise<boolean> {
        return true;
    }

    decodeToken(token : string) : any {
        return { };
    }
}
