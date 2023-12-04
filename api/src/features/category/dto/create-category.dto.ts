import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ description: 'Description of Category is optional' })
  description: string;

  @IsOptional()
  @ApiProperty({
    description:
      'When creating a new Category the number of tickets associated with it will start at 0, this number will increase or descrease depending of the associated tickets. A category cannot be deleted if it has at least 1 ticket associated to it',
  })
  numberoftickets: number;
} //End of class CreateCategroyDto
