import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateUserInput } from './create-user.dto';

export class UpdateUserInput extends PartialType(CreateUserInput) {}

export class UpdateUserOutput extends CoreOutput {}
