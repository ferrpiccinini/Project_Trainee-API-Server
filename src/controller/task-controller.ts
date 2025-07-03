import { Controller, Post } from "@nestjs/common";
import { TaskService } from "src/services/task-service";

@Controller("task")
    export class TaskController {
        constructor(private taskService: TaskService){}
        @Post()
        createTask() {
            return this.taskService.createTask();
        }
    }
