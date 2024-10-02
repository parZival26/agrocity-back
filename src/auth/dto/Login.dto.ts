import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;

}