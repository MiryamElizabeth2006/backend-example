import { IsString, IsInt, IsNotEmpty, Min, MinLength, IsEmail} from 'class-validator'
//import { isBooleanObject } from 'util/types'
export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    last: string

    @IsString()
    @IsNotEmpty()
    telefono: string

    @IsInt()
    @Min(1)
    age: number

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string 
}
