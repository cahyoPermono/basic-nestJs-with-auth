import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(newUser: CreateUserInput): Promise<User> {
    const emailExists = await this.userRepo.findOne({ email: newUser.email });
    const usernameExists = await this.userRepo.findOne({
      username: newUser.username,
    });

    if (emailExists || usernameExists) {
      throw new BadRequestException(
        'There is already a user with that username/email',
      );
    }

    return await this.userRepo.save(this.userRepo.create(newUser));
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    try {
      return await this.userRepo.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`There is no User with id ${id}`);
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      return this.userRepo.findOneOrFail({ username });
    } catch (e) {
      throw new NotFoundException(`There's no user with username ${username}`);
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const exists = await this.userRepo.findOne(id);
    if (!exists) {
      throw new NotFoundException('User Not Found');
    }

    return await this.userRepo.update(id, { ...updateUserInput });
  }

  async remove(id: number) {
    const userTobEDeleted = await this.userRepo.findOne(id);
    if (userTobEDeleted) {
      return this.userRepo.remove(userTobEDeleted);
    } else {
      throw new NotFoundException(`User with id ${id} is not found!!`);
    }
  }
}
