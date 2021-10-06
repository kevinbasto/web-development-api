export interface TemplateLoader {
    loadTemplate(template : string) : string;
    processTemplateWithContent(template : string, content  : Object) : string; 
}
