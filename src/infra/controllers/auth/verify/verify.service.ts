import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyService {
    
    constructor(){}

    verifyEmailUser() : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            
        })
    }
}
