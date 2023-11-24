import { IsNotEmpty, Matches, IsEmail, MinLength, IsDate, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: "Password should contain at leat 1  uppercase, 1 number an 1 special character",
    })
    @IsNotEmpty()
    @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}$/, {
        message: "Password is NOT strong enough",
    })
    password: string
    

}