import { Module } from '@nestjs/common';
import { TaskController } from './controller/task-controller';
import { TaskService } from './services/task-service';
import { ListController } from './controller/list-controller';
import { ListService } from './services/list-service';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { TaskRepository } from './repository/taskRepository';
import { ListRepository } from './repository/listRepository';
=======
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66

@Module({
  imports: [PrismaModule],
  controllers: [TaskController, ListController],
<<<<<<< HEAD
  providers: [TaskService, ListService, TaskRepository, ListRepository],
=======
  providers: [TaskService, ListService],
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
})
export class AppModule {}
