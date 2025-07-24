import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from 'src/dto/taskDtos';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  createTask(dto: TaskDto) {
    return this.prisma.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        priority: dto.priority,
        listId: dto.listId,
        expectedFinishDate: dto.expectedFinishDate
      }
    });
  }

  findTasksByListId(listId: string) {
    return this.prisma.list.findUnique({
      where: { id: listId },
      include: { tasks: true }
    });
  }

  findTaskById(taskId: string) {
    return this.prisma.task.findUnique({
      where: { id: taskId },
      include: { list: true }
    });
  }

  updateTask(taskId: string, dto: TaskDto) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        name: dto.name,
        priority: dto.priority,
        listId: dto.listId,
        expectedFinishDate: dto.expectedFinishDate,
        description: dto.description
      }
    });
  }

  deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: { id: taskId }
    });
  }
}