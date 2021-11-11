import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../tools/tools.module';
import { CREATE_EMAIL_ACCOUNT_REPO_TOKEN, FETCH_EMAIL_ACCOUNT_REPO_TOKEN, UPDATE_EMAIL_ACCOUNT_REPO_TOKEN } from './accounts.tokens';
import { CreateAccountService } from './create-account/create-account.service';
import { FetchEmailAccountService } from './fetch-email-account/fetch-email-account.service';
import { UpdateEmailAccountService } from './update-email-account/update-email-account.service';

const services : Provider<any>[] = [
    {
        provide : CREATE_EMAIL_ACCOUNT_REPO_TOKEN,
        useClass : CreateAccountService
    },
    {
        provide : FETCH_EMAIL_ACCOUNT_REPO_TOKEN,
        useClass : FetchEmailAccountService
    },
    {
        provide: UPDATE_EMAIL_ACCOUNT_REPO_TOKEN,
        useClass: UpdateEmailAccountService
    }
]

@Module({
    imports: [
        ToolsModule
    ],
    providers: services,
    exports: services
})
export class AccountsModule {}
