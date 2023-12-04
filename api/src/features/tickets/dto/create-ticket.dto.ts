import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  title: string;

  @MinLength(2)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Existent Category' })
  category: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  duedate?: Date;

  @ApiProperty({
    description: 'User who creates the ticket gets it assigned to themself',
  })
  assignee: string;
} //End of class CreateUserDto
