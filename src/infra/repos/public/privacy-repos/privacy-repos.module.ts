import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../../tools/tools.module';
import { CreatePrivacyRepoService } from './create-privacy-repo/create-privacy-repo.service';
import { CREATE_PRIVACY_REPO_TOKEN, GET_PRIVACY_REPO_TOKEN, UPDATE_PRIVACY_REPO_TOKEN } from './privacy-repos-tokens';
import { GetPrivacyRepoService } from './get-privacy-repo/get-privacy-repo.service';
import { EditPrivacyRepoService } from './edit-privacy-repo/edit-privacy-repo.service';

const services : Provider<any>[] = [
    {
        provide: CREATE_PRIVACY_REPO_TOKEN,
        useClass: CreatePrivacyRepoService
    },
    {
        provide: GET_PRIVACY_REPO_TOKEN,
        useClass: GetPrivacyRepoService
    },
    {
        provide: UPDATE_PRIVACY_REPO_TOKEN,
        useClass: EditPrivacyRepoService
    }
]

@Module({
    imports: [ToolsModule],
    providers: services,
    exports: services
})
export class PrivacyReposModule {}
