import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TaskDto } from "src/dto/taskDtos";
import { ListService } from "src/services/list-service";

@Injectable()
export class TaskService {
    constructor(
      private prisma: PrismaService,
      private listService: ListService 
    ) {}

    async createTask(dto: TaskDto) {
        const list = await this.listService.getListById(dto.listId)
        if(list) {
            const task = await this.prisma.task.create({
                data: {
                    name: dto.name,
                    priority: dto.priority,
                    listId: dto.listId,
                    expectedFinishDate: dto.expectedFinishDate,
                }
            })
            list.tasks.save(task);
        }
    }
}

