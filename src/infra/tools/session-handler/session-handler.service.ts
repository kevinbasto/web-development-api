import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from '../../../core/dto/auth/session-dto';
import { SessionHandler } from '../../../core/ports/session-handler.interface';
import { jwtRefreshSecret } from './jwtSecret';

@Injectable()
export class SessionHandlerService implements SessionHandler{
    
    constructor(
        private jwtService: JwtService
    ) {}

    signSession(payload : Object) : SessionDto {
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {
                secret: jwtRefreshSecret,
                expiresIn: '7d'
            })
        }
    }

    async verifySession(session : string) : Promise<boolean> {
        let isValid = await this.jwtService.verifyAsync(session).catch(error => { throw error });
        return !!isValid;
    }

    async verifyrefreshToken(token : string) : Promise<boolean>{
        return false;
    }

    decodeToken(token : string) : any {
        return this.jwtService.decode(token);
    }
}
