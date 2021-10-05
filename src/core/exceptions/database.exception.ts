import { InternalServerErrorException } from "@nestjs/common";
import { Exception } from "./exception.interface";

export class DatabaseException extends Error implements Exception{

    constructor(name : string, message : string){
        super()
        this.name = name;
        this.message = message;
    }

    getException(){
        return new InternalServerErrorException({ name : this.name, message: this.message });
    }
}
