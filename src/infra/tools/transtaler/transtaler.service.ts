import { Injectable } from '@nestjs/common';
import { I18nLang, I18nService } from 'nestjs-i18n';
import { Translater } from '../../../core/ports/translater.interface';

@Injectable()
export class TranslaterService implements Translater {
    constructor(
        private readonly i18n: I18nService
    ) {}

    async getTranslation(@I18nLang() lang: string, message : string, args?: Object) : Promise<any> {
        let response = await this.i18n.translate(message, {
            lang : lang,
            args: args
        });
        return response;
    }
}
