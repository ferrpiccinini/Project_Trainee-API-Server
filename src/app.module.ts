import { Module } from '@nestjs/common';
import { TaskController } from './controller/task-controller';
import { TaskService } from './services/task-service';
import { ListController } from './controller/list-controller';
import { ListService } from './services/list-service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskRepository } from './repository/taskRepository';
import { ListRepository } from './repository/listRepository';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController, ListController],
  providers: [TaskService, ListService, TaskRepository, ListRepository],
})
export class AppModule {}
