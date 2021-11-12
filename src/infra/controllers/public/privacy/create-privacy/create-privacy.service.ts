import { Injectable } from '@nestjs/common';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';

@Injectable()
export class CreatePrivacyService {

    constructor() {}

    public publishPrivacy(privacy : PrivacyDto) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {})
    }
}
