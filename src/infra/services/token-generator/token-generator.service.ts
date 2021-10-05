import { Injectable } from '@nestjs/common';
import { TokenGenerator } from '../../../core/ports/token-generator.interface';

@Injectable()
export class TokenGeneratorService implements TokenGenerator {}
