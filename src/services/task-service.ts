import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";
import { TaskDto } from "src/dto/taskDtos";
import { ListService } from "src/services/list-service";
import { validateUUIDOrThrow } from 'src/utils/uuid.helper';
import { TaskRepository } from 'src/repository/taskRepository';

@Injectable()
export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    @Inject(forwardRef(() => ListService))
    private listService: ListService
  ) {}

  async createTask(dto: TaskDto) {
    const list = await this.listService.getListById(dto.listId);
    if (list) {
      const task = await this.taskRepository.createTask(dto);
      if (task.expectedFinishDate) {
        if (task.expectedFinishDate < new Date()) {
          throw new BadRequestException("Expected finish date must be after today's date");
        }
      }
      list.tasks.push(task);
      return task;
    } else {
      throw new NotFoundException('List with this ID was not found.');
    }
  }

  async getTaskbyListId(listId: string) {
    validateUUIDOrThrow(listId, 'Task ID');
    const list = await this.taskRepository.findTasksByListId(listId);
    if (list) {
      return list.tasks;
    } else {
      throw new NotFoundException('List with this ID was not found.');
    }
  }

  async getTaskByTaskId(taskId: string) {
    validateUUIDOrThrow(taskId, 'Task ID');
    const task = await this.taskRepository.findTaskById(taskId);
    if (task) {
      return task;
    } else {
      throw new NotFoundException('Task with this ID was not found.');
    }
  }

  async updateTask(taskId: string, dto: TaskDto) {
    validateUUIDOrThrow(taskId, 'Task ID');
    const existingList = await this.getTaskByTaskId(taskId);
    if (dto.expectedFinishDate) {
      if (dto.expectedFinishDate < new Date()) {
        throw new BadRequestException("Expected finish date must be after today's date");
      }
    }
    if (existingList) {
      const task = await this.taskRepository.updateTask(existingList.id, dto);
      return task;
    }
    if (!existingList) {
      throw new NotFoundException('List with this ID was not found.');
    }
  }

  async deleteTask(taskId: string) {
    validateUUIDOrThrow(taskId, 'Task ID');
    const existingTask = await this.getTaskByTaskId(taskId);
    if (existingTask) {
      await this.taskRepository.deleteTask(existingTask.id);
      return { message: 'Task deleted successfully' };
    } else {
      throw new NotFoundException('Task with this ID was not found.');
    }
  }
}