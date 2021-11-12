import { Module, Provider } from '@nestjs/common';
import { ToolsModule } from '../../../tools/tools.module';
import { CreatePrivacyRepoService } from './create-privacy-repo/create-privacy-repo.service';
import { CREATE_PRIVACY_REPO_TOKEN } from './privacy-repos-tokens';

const services : Provider<any>[] = [
    {
        provide: CREATE_PRIVACY_REPO_TOKEN,
        useClass: CreatePrivacyRepoService
    }
]

@Module({
    imports: [ToolsModule],
    providers: services,
    exports: services
})
export class PrivacyReposModule {}
