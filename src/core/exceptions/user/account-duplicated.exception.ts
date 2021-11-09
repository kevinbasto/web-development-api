import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "../exception.interface";

export class AccountDuplicatedException extends Error implements Exception{
    constructor( name : string, message : string ) {
        super();
        this.name = name;
        this.message = message;
    }

    getException() {
        return new UnauthorizedException({ name : this.name, message : this.message })
    }
}
