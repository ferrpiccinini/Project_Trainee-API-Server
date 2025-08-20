<<<<<<< HEAD
import { IsEnum, IsOptional, IsDate, IsNotEmpty, IsString, isDate } from "class-validator";
=======
import { IsEnum, IsOptional, IsDate, IsNotEmpty, IsString } from "class-validator";
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
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
<<<<<<< HEAD
    expectedFinishDate?: Date;
=======
    expectedFinishDate: Date;
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66

    @IsOptional()
    @IsString()
    description?: string;
<<<<<<< HEAD
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    finishDate?: Date;
=======
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
}

