import { Injectable } from '@nestjs/common';
import { Translater } from '../../../core/ports/translater.interface';

@Injectable()
export class TranslaterService implements Translater {}
