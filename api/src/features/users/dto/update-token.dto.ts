import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateTokenDto extends PartialType(CreateUserDto) {
  refreshToken?: string;

  resetToken?: string;

  @IsDate()
  @Type(() => Date)
  lastconnection?: Date;
}
