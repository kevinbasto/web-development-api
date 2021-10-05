import { Injectable } from '@nestjs/common';

@Injectable()
export class RecoverService {

    constructor(){}

    recoverWithEmailAndPassword() : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            
        })
    }
}
