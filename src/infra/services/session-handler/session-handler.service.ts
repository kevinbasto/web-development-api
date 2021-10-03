import { Injectable } from '@nestjs/common';
import { SessionDto } from '../../../core/dto/auth/session-dto';
import { SessionHandler } from '../../../core/ports/session-handler.interface';

@Injectable()
export class SessionHandlerService implements SessionHandler{
    
    signSession(payload : Object) : SessionDto {
        return {
            accessToken : "",
            refreshToken : ""
        }
    }

    async verifySession(session : string) : Promise<any> {

    }

    async verifyrefreshToken(token : string) : Promise<boolean> {
        return false;
    }

    decodeToken(token : string) : any{

    }
}
