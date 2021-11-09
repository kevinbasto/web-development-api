import { NotFoundException } from "@nestjs/common";
import { Exception } from "./exception.interface";

export class UserNotFoundException extends Error implements Exception{

    constructor(name : string, message : string){
        super();
        this.name = name;
        this.message = message;
    }

    getException(){
        return new NotFoundException({ name : this.name, message : this.message});
    }
}
