import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {

    constructor(){}

    loginWithEmailAndPassword() : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            
        })
    }
}
