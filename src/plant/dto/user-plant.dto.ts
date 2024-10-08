import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

 

export class UserPlantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    plantId: number;
}