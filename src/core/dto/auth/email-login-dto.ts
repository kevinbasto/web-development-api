import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class EmailLoginDto {
    /**
     * email - string
     * password - string
     */
    @ApiProperty()
    @IsString()
    email : string;
    @ApiProperty()
    @IsString()
    password : string;
}
