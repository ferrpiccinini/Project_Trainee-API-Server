import { Module } from '@nestjs/common';
import { TaskController } from './controller/task-controller';
import { TaskService } from './services/task-service';
import { ListController } from './controller/list-controller';
import { ListService } from './services/list-service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController, ListController],
  providers: [TaskService, ListService],
})
export class AppModule {}
