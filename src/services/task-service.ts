import { 
    Injectable, 
    Inject, 
    forwardRef 
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TaskDto } from "src/dto/taskDtos";
import { ListService } from "src/services/list-service";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";	

@Injectable()
export class TaskService {
    constructor(
      private prisma: PrismaService,
      @Inject(forwardRef(() => ListService))
      private listService: ListService 
    ) {}

    async createTask(dto: TaskDto) {
        const list = await this.listService.getListById(dto.listId);
        if (list) {
            const task = await this.prisma.task.create({
                data: {
                    name: dto.name,
                    priority: dto.priority,
                    listId: dto.listId,
                    expectedFinishDate: dto.expectedFinishDate,
                }
            });
            if(task.expectedFinishDate){
                if(task.expectedFinishDate < new Date()){
                    throw new BadRequestException("Expected finish date must be after today's date");
                }
            }
            list.tasks.push(task);
            return task; 
        }
        else{
            throw new NotFoundException('List with this ID was not found.');      
        }
    }
}
