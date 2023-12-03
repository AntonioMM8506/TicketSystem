import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsOptional()
  @MinLength(2)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsDate()
  lastupdate: Date = new Date();
}
