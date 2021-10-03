import { SessionDto } from "../dto/auth/session-dto";

export interface SessionHandler {
    signSession(payload : Object) : SessionDto;
    verifySession(session : string) : Promise<any>;
    verifyrefreshToken(token : string) : Promise<boolean>;
    decodeToken(token : string) : any;
}
