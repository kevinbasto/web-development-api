import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../tools/tools.module';
import { CREATE_EMAIL_ACCOUNT_REPO_TOKEN } from './accounts.tokens';
import { CreateAccountService } from './create-account/create-account.service';

const services : Provider<any>[] = [
    {
        provide : CREATE_EMAIL_ACCOUNT_REPO_TOKEN,
        useClass : CreateAccountService
    }
]

@Module({
    imports: [
        ToolsModule
    ],
    providers: services
})
export class AccountsModule {}
