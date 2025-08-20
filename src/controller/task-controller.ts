import { Body, Controller, Post, Get, Param, Put, Delete} from "@nestjs/common";
import { TaskDto } from "src/dto/taskDtos";
import { TaskService } from "src/services/task-service";

@Controller("tasks")
    export class TaskController {
        constructor(private taskService: TaskService){}
        @Post()
        createTask(@Body() dto: TaskDto) {
            return this.taskService.createTask(dto);
        }

        @Get("lists/:listId")
        getTaskbyListId(@Param("listId") listId: string) {
            return this.taskService.getTaskbyListId(listId);
        }

        @Get(":taskid")
        getTaskByTaskId(@Param("taskid") taskid: string) {
            return this.taskService.getTaskByTaskId(taskid);
        }

        @Put(":taskid")
        updateTask(@Param("taskid") taskid: string, @Body() dto: TaskDto) {
            return this.taskService.updateTask(taskid, dto);
        }

        @Delete(":taskid")
        deleteTask(@Param("taskid") taskid: string) {
            return this.taskService.deleteTask(taskid);
        }
    }
