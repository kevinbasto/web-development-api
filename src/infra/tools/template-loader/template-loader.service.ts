import { Injectable } from '@nestjs/common';
import { TemplateLoader } from '../../../core/ports/template-loader.interface';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path'

@Injectable()
export class TemplateLoaderService implements TemplateLoader{

    loadTemplate(templateName : string) : string{
        let template : string = fs.readFileSync(path.join(__dirname, `../../../assets/templates/${templateName}.hbs`), 'utf-8');
        return template;
    }

    processTemplateWithContent(template : string, content  : Object) : string {
        let hbTemplate = handlebars.compile(template);
        let htmlToSend = hbTemplate(content);
        return htmlToSend;
    }
}
