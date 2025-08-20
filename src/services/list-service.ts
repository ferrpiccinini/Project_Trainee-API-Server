import {
  Injectable,
  NotFoundException,
  ConflictException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { ListDto } from 'src/dto/listsDtos';
import { TaskService } from 'src/services/task-service';
import { validateUUIDOrThrow } from 'src/utils/uuid.helper';
import { ListRepository } from 'src/repository/listRepository';

@Injectable()
export class ListService {
  constructor(
    private listRepository: ListRepository,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService
  ) {}

  async createList(dto: ListDto) {
    const existing = await this.listRepository.findListByName(dto.name);
    if (existing) {
      throw new ConflictException('A list with this name already exists.');
    }

    const tasksData = dto.tasks?.map(({ listId, ...rest }) => rest) || [];
    return this.listRepository.createList(dto, tasksData);
  }


  getAllLists() {
    return this.listRepository.findAllLists();
  }

  async getListById(id: string) {
    validateUUIDOrThrow(id, 'List ID');
    const list = await this.listRepository.findListById(id);
    if (list) {
      return list;
    } else {
      throw new NotFoundException('List with this ID was not found.');
    }
  }

  async getListByName(name: string) {
    const list = await this.listRepository.findListByName(name);
    if (list) {
      return list;
    } else {
      throw new NotFoundException('List with this Name was not found.');
    }
  }

  async updateList(id: string, dto: ListDto) {
    validateUUIDOrThrow(id, 'List ID');
    const existingList = await this.getListById(id);
    if (existingList) {
      const listWithSameName = await this.listRepository.findListByName(dto.name);
      if (listWithSameName && listWithSameName.id !== existingList.id) {
        throw new ConflictException('A list with this name already exists.');
      }
      const updatedList = await this.listRepository.updateList(existingList.id, dto.name);
      return updatedList;
    }
  }

  async deleteList(id: string) {
    const existingList = await this.getListById(id);
    validateUUIDOrThrow(id, 'List ID');
    if (existingList) {
      await this.listRepository.deleteList(id);
      return { message: 'List deleted successfully.' };
    }
  }
}