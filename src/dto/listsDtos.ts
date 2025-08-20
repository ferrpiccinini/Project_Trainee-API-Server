import { IsNotEmpty, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { TaskDto } from "./taskDtos";

export class ListDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TaskDto) //valida se os objetos dentro do array são do tipo TaskDto
    tasks?: TaskDto[];
}

