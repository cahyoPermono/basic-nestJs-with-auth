import { OmitType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

export class CreateUserInput extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class CreateUserOutput extends CoreOutput {}
