import { IsNotEmpty, Matches, IsEmail, MinLength, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateTokenDto extends PartialType(CreateUserDto) {
    refreshToken?: string;

    @IsDate()
    @Type(() => Date)
    lastconnection: Date;
}
