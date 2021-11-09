import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../tools/tools.module';
import { CREATE_EMAIL_ACCOUNT_REPO_TOKEN, FETCH_EMAIL_ACCOUNT_REPO_TOKEN } from './accounts.tokens';
import { CreateAccountService } from './create-account/create-account.service';
import { FetchEmailAccountService } from './fetch-email-account/fetch-email-account.service';

const services : Provider<any>[] = [
    {
        provide : CREATE_EMAIL_ACCOUNT_REPO_TOKEN,
        useClass : CreateAccountService
    },
    {
        provide : FETCH_EMAIL_ACCOUNT_REPO_TOKEN,
        useClass : FetchEmailAccountService
    }
]

@Module({
    imports: [
        ToolsModule
    ],
    providers: services
})
export class AccountsModule {}
