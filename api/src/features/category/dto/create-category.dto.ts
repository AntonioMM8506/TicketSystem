import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  numberoftickets: number;
} //End of class CreateCategroyDto
