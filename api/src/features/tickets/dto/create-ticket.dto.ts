import { IsNotEmpty, Matches, IsEmail, MinLength, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    title: string

    @MinLength(2)
    description: string

    @IsOptional()
    category: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    duedate: Date

    @ApiProperty()
    assignee: string


}//End of class CreateUserDto

