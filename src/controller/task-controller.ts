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
<<<<<<< HEAD
        getTaskbyListId(@Param("listId") listId: string) {
            return this.taskService.getTaskbyListId(listId);
=======
        getTasksListById(@Param("listId") listId: string) {
            return this.taskService.getTasksListById(listId);
>>>>>>> 443e319c8e1a8ea65dd5830fa3994f1ad6aabf66
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
