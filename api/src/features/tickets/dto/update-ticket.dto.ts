import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  title?: string;

  @MinLength(2)
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  category?: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  duedate?: Date;

  @ApiProperty()
  assignee?: string;
}
