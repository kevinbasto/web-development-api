import { Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
    constructor(
        private registerService : RegisterService
    ) {}

    @Post('')
    registerWithEmailAndPassword() : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.registerService.registerWithEmailAndPassword()
            .then(res => resolve(res))
            .catch(err => {reject(err)});
        });
    }
}
