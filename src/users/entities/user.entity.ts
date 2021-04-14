import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

enum UserRole {
  Super,
  Admin,
  Client,
}

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  handphone: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  address: string;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
