import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponse } from './dto/task-response.dto';
import { TaskUtils } from './utils/tasks.utils';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        private readonly taskUtils: TaskUtils
    ) {}

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskResponse> {
        const user = await this.taskUtils.retrieveUser(userId);
        const task = await this.tasksRepository.create({
            ...createTaskDto,
            user,
        });

        await this.tasksRepository.save(task);
        return this.taskUtils.mapToTaskResponse(task);
    }

    async findAll(userId: string): Promise<TaskResponse[]> {
        const tasks: Task[] = await this.tasksRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC'}
        });

        return tasks.map(this.taskUtils.mapToTaskResponse);
    }

    async findOne(id: string, userId: string): Promise<TaskResponse> {
        const task = await this.tasksRepository.findOneOrFail({
            where: { id, user: {id: userId }},
        });

        return this.taskUtils.mapToTaskResponse(task);
    }
    
    async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<TaskResponse> {
        await this.tasksRepository.update({
            id, user: { id: userId } },
            updateTaskDto,
        );
        return await this.findOne(id, userId);
    }

    async remove(id: string, userId: string): Promise<void> {
        await this.tasksRepository.delete({ id, user: { id: userId } });
    }
}
