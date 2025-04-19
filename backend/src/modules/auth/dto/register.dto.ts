import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'name of the user',
        default: 'John Doe'
    })
    name: string;
    
    @IsEmail()
    @ApiProperty({
        description: 'email of the user',
        default: 'john@doe.com'
    })
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty( {
        description: 'password of the user',
        minimum: 8,
        default: 'password123'
    })
    password: string;
}