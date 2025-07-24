import { IsEnum, IsOptional, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    VERY_HIGH = 'VERY_HIGH',
  }
  
export class TaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(Priority)
    @IsOptional()  
    priority?: Priority;

    @IsString()
    @IsNotEmpty()
    listId: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    expectedFinishDate: Date;

    @IsOptional()
    @IsString()
    description?: string;
}

