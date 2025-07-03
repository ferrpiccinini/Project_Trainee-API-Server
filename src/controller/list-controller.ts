import { Body, Controller, ParseUUIDPipe, Post, Get, Put, Delete, Param} from "@nestjs/common";
import { ListDto } from "src/dto";
import { ListService } from "src/services/list-service";


@Controller("lists")
    export class ListController {
        constructor(private listService: ListService){}
        @Post()
        createList(@Body() dto: ListDto) {
            return this.listService.createList(dto);
        }
        @Get()
        getAllLists() {
            return this.listService.getAllLists();
        }
        @Get(":id")
        getListById(@Param("id",ParseUUIDPipe) id: string) {
          return this.listService.getListById(id);
        }
        @Get("name/:name")
        getListByName(@Param("name") name: string) {
            return this.listService.getListByName(name);
        }
        @Put(":id")
        putList(@Param("id", ParseUUIDPipe) id: string, @Body() dto: ListDto) {
            return this.listService.updateList(id, dto);
        }
        @Delete(":id")
        deleteList(@Param("id", ParseUUIDPipe) id: string) {
            return this.listService.deleteList(id);
        }
    }
