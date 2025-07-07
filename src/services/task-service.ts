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
import { validateUUIDOrThrow } from 'src/utils/uuid.helper';


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

    async getTasksListById(listId: string) {
        validateUUIDOrThrow(listId, 'Task ID');
        const list = await this.prisma.list.findUnique({
            where: { id: listId },
            include: { tasks: true }
        });
        if (list) {
            return list.tasks;
        } else {
            throw new NotFoundException('List with this ID was not found.');
        }
    }

    async getTaskByTaskId(taskId: string) {
        validateUUIDOrThrow(taskId, 'Task ID');
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { list: true }
        });
        if (task) {
            return task;
        } else {
            throw new NotFoundException('Task with this ID was not found.');
        }
    }

    async updateTask(taskId: string, dto: TaskDto) {
        validateUUIDOrThrow(taskId, 'Task ID');
        const existingList = await this.getTaskByTaskId(taskId);
        if(dto.expectedFinishDate){
            if(dto.expectedFinishDate < new Date()){
                throw new BadRequestException("Expected finish date must be after today's date");
            }
        }
        if (existingList) {
            const task = await this.prisma.task.update({
                where: { id: existingList.id },
                data: {
                    name: dto.name,
                    priority: dto.priority,
                    listId: dto.listId,
                    expectedFinishDate: dto.expectedFinishDate,
                    description: dto.description
                }
            });
            return task; 
        }
        if(!existingList){
            throw new NotFoundException('List with this ID was not found.');      
        }
    }

    async deleteTask(taskId: string) {
        validateUUIDOrThrow(taskId, 'Task ID');
        const existingTask = await this.getTaskByTaskId(taskId);
        if (existingTask) {
            await this.prisma.task.delete({
                where: { id: existingTask.id }
            });
            return { message: 'Task deleted successfully' };
        } else {
            throw new NotFoundException('Task with this ID was not found.');
        }
    }
}
