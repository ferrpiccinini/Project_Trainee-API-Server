import {
  Injectable,
  NotFoundException,
  ConflictException,
  forwardRef,
  Inject,
<<<<<<< HEAD
} from '@nestjs/common';
import { ListDto } from 'src/dto/listsDtos';
import { TaskService } from 'src/services/task-service';
import { validateUUIDOrThrow } from 'src/utils/uuid.helper';
import { ListRepository } from 'src/repository/listRepository';
=======
  ParseUUIDPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListDto } from 'src/dto/listsDtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TaskService } from 'src/services/task-service';
import { validateUUIDOrThrow } from 'src/utils/uuid.helper';

>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66

@Injectable()
export class ListService {
  constructor(
<<<<<<< HEAD
    private listRepository: ListRepository,
    @Inject(forwardRef(() => TaskService))
=======
    private prisma: PrismaService,
    @Inject(forwardRef(() => TaskService)) //um depende do outro ai da bo
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
    private taskService: TaskService
  ) {}

  async createList(dto: ListDto) {
<<<<<<< HEAD
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
=======
    try{
      const tasksData = dto.tasks?.map(({ listId, ...rest }) => rest) || [];
      const list = await this.prisma.list.create({
        data: {
          name: dto.name,
          tasks: {
            create: tasksData
          }
        },
        include: { tasks: true }
      })
      return list;
    }catch(error){
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new ConflictException('A list with this name already exists.');
        }
      }
      throw error;
    }
  }

  getAllLists() {
    return this.prisma.list.findMany({
      include: { tasks: true }
    });
      
  }

  async getListById(id: string) {
      validateUUIDOrThrow(id, 'List ID');
      const list = await this.prisma.list.findUnique({
      where: {id: id,},
      include: { tasks: true }
    });
  
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
    if (list) {
      return list;
    } else {
      throw new NotFoundException('List with this ID was not found.');
    }
  }
<<<<<<< HEAD

  async getListByName(name: string) {
    const list = await this.listRepository.findListByName(name);
=======
  
  async getListByName(name: string) {
    const list = await this.prisma.list.findUnique({
      where: {name: name,},
    });
  
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
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
<<<<<<< HEAD
      const listWithSameName = await this.listRepository.findListByName(dto.name);
      if (listWithSameName && listWithSameName.id !== existingList.id) {
        throw new ConflictException('A list with this name already exists.');
      }
      const updatedList = await this.listRepository.updateList(existingList.id, dto.name);
      return updatedList;
    }
  }

=======
      const listWithSameName = await this.prisma.list.findUnique({
        where: {
          name: dto.name,
        }
      });

      if (listWithSameName && listWithSameName.id !== existingList.id) {
        throw new ConflictException('A list with this name already exists.');
      }

      const updatedList = await this.prisma.list.update({
        where: { id: existingList.id },
        data: { name: dto.name },
      });
  
      return updatedList;

    }
  }
  
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
  async deleteList(id: string) {
    const existingList = await this.getListById(id);
    validateUUIDOrThrow(id, 'List ID');
    if (existingList) {
<<<<<<< HEAD
      await this.listRepository.deleteList(id);
=======
      await this.prisma.list.delete({
        where: { id: existingList.id },
      });
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
      return { message: 'List deleted successfully.' };
    }
  }
}