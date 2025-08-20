import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListDto } from 'src/dto/listsDtos';

@Injectable()
export class ListRepository {
  constructor(private prisma: PrismaService) {}

  createList(dto: ListDto, tasksData: any[]) {
    return this.prisma.list.create({
      data: {
        name: dto.name,
        tasks: { create: tasksData }
      },
      include: { tasks: true }
    });
  }

  findAllLists() {
    return this.prisma.list.findMany({
      include: { tasks: true }
    });
  }

  findListById(id: string) {
    return this.prisma.list.findUnique({
      where: { id },
      include: { tasks: true }
    });
  }

  findListByName(name: string) {
    return this.prisma.list.findUnique({
      where: { name }
    });
  }

  updateList(id: string, name: string) {
    return this.prisma.list.update({
      where: { id },
      data: { name }
    });
  }

  deleteList(id: string) {
    return this.prisma.list.delete({
      where: { id }
    });
  }
}