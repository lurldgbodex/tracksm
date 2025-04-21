import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Request } from 'express';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
        const user = req.user as { sub: string, email: string }

        return await this.taskService.create(createTaskDto, user.sub);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Req() req: Request) {
        const user = req.user as {sub: string, email: string}
        return await this.taskService.findAll(user.sub);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findById(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as {sub: string, email: string}
        return await this.taskService.findOne(id, user.sub);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: Request) {
        const user = req.user as {sub: string, email: string}
        return await this.taskService.update(id, dto, user.sub)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as {sub: string, email: string}
        return await this.taskService.remove(id, user.sub);
    }
}
