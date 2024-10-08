

import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserPlantDto } from './user-plant.dto';

export class UserPlantArrayDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => UserPlantDto)
    userPlants: UserPlantDto[];
}