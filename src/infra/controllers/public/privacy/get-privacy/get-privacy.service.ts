import { Injectable } from '@nestjs/common';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';

@Injectable()
export class GetPrivacyService {

    constructor(){}

    public getPrivacyPolicies( lang : string) : Promise<PrivacyDto>{
        return new Promise<PrivacyDto>((resolve, reject) => {})
    }
}
