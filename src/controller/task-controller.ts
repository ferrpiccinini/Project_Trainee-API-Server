import { Body, Controller, Post } from "@nestjs/common";
import { TaskDto } from "src/dto/taskDtos";
import { TaskService } from "src/services/task-service";

@Controller("task")
    export class TaskController {
        constructor(private taskService: TaskService){}

        @Post()
        createTask(@Body() dto: TaskDto) {
            return this.taskService.createTask(dto);
        }


    }
