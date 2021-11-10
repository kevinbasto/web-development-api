import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../tools/tools.module';
import { CreateUserRepoService } from './create-user-repo/create-user-repo.service';
import { FetchUserService } from './fetch-user/fetch-user.service';
import { CREATE_USER_REPO, FETCH_USER_REPO } from './users.token';

const services : Provider<any>[] = [
    {
        provide: CREATE_USER_REPO,
        useClass: CreateUserRepoService
    },
    {
        provide : FETCH_USER_REPO,
        useClass: FetchUserService
    }
]

@Module({
    imports : [
        ToolsModule
    ],
    providers: services,
    exports : services
})
export class UsersModule {}
