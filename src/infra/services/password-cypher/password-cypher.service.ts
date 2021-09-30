import { Injectable } from '@nestjs/common';
import { PasswordCypher } from '../../../core/ports/password-cypher.interface';

@Injectable()
export class PasswordCypherService implements PasswordCypher {}
