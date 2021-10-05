import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "./exception.interface";

export class PasswordMismatchException extends Error implements Exception{
    
    constructor(name : string, message : string){
        super();
        this.name = name;
        this.message = message;
    }

    getException(){
        throw new UnauthorizedException({ name : this.name, message : this.message});
    }
}
