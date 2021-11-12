import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';

@ApiTags('privacy policies')
@Controller('privacy')
export class CreatePrivacyController {


    @Post('')
    public CreateNovel() : Promise<SystemMessage> {
        return new Promise<SystemMessage>((resolve, reject) => {

        })
    }
}
