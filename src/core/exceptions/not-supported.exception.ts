import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../ports/exception.port.interface";

export class NotSupportedException extends Error implements Exception{

    constructor(name : string, message : string){
        super();
        this.name = name;
        this.message = message;
    }

    getException(){
        return new UnauthorizedException({ name : this.name, message : this.message });
    }
}
