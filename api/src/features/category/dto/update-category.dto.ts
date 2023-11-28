import { IsNotEmpty,  MinLength, IsOptional, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    name: string

    @IsOptional()
    description: string

    @IsOptional()
    numberoftickets: number;
}
