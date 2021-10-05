import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
    constructor() {}
    
    registerWithEmailAndPassword() : Promise<any>{
        return new Promise<any>((resolve, reject) => {

        });
    }
}
