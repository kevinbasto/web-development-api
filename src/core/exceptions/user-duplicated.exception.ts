import { UnauthorizedException } from "@nestjs/common";
import { Exception } from "./exception.interface";

export class UserDuplicatedException extends Error implements Exception{
    constructor( name : string, message : string ) {
        super();
    }

    getException() {
        return new UnauthorizedException({ name : this.name, message : this.message })
    }
}
