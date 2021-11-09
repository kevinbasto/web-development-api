import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../tools/tools.module';
import { CreateUserRepoService } from './create-user-repo/create-user-repo.service';
import { CREATE_USER_REPO } from './users.token';

const services : Provider<any>[] = [
    {
        provide: CREATE_USER_REPO,
        useClass: CreateUserRepoService
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
