import {
  Injectable,
  NotFoundException,
  ConflictException,
  forwardRef,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListDto } from 'src/dto/listsDtos';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TaskService } from 'src/services/task-service';
import { validateUUIDOrThrow } from 'src/utils/uuid.helper';


@Injectable()
export class ListService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => TaskService)) //um depende do outro ai da bo
    private taskService: TaskService
  ) {}

  async createList(dto: ListDto) {
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
  
    if (list) {
      return list;
    } else {
      throw new NotFoundException('List with this ID was not found.');
    }
  }
  
  async getListByName(name: string) {
    const list = await this.prisma.list.findUnique({
      where: {name: name,},
    });
  
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
  
  async deleteList(id: string) {
    const existingList = await this.getListById(id);
    validateUUIDOrThrow(id, 'List ID');
    if (existingList) {
      await this.prisma.list.delete({
        where: { id: existingList.id },
      });
      return { message: 'List deleted successfully.' };
    }
  }
}