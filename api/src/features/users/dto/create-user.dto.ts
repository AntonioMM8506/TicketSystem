import { IsNotEmpty, Matches, IsEmail, MinLength, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    name: string


    @IsNotEmpty()
    @MinLength(2)
    lastname: string


    @IsNotEmpty()
    @IsEmail()
    email: string


    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/
    @ApiProperty({
        description: "Password should contain at leat 1  uppercase, 1 number an 1 special character",
    })
    @IsNotEmpty()
    //(?=.*[a-z]) => 1 lowercase at least
    //(?=.*[A-Z]) => 1 uppercase at least
    //(?=.*[0-9]) => 1 number at least
    //(?=.*[^A-Za-z0-9]) => 1 special character, negation of all alphanumeric characters
    //.{10,} => 10 characters long at least
    @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}$/, {
        message: "Password is NOT strong enough",
    })
    password: string


    @IsNotEmpty()
    gender: string


    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lastconnection: Date


    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lastupdate: Date


    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly birthdate: Date


}//End of class CreateUserDto
