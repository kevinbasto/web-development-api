import { Injectable } from '@nestjs/common';
import { UuidGenerator } from '../../../core/ports/uuid-generator.interface';
import * as crypto from 'crypto'

@Injectable()
export class UuidGeneratorService implements UuidGenerator{
    GenerateUuid(payload : Object) : string {
        return crypto.createHash("sha512").update(JSON.stringify(payload)).digest("hex");
    }
}
