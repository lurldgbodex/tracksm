import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/modules/auth/entities/user.entity";
import { UsersService } from "src/modules/users/user.service";
import { TaskResponse } from "../dto/task-response.dto";
import { Task } from "../entities/task.entity";

@Injectable()
export class TaskUtils {
    constructor(
        private readonly userService: UsersService,
    ) {}

    async retrieveUser(userId: string): Promise<User> {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    mapToTaskResponse(task: Task): TaskResponse {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            due_date: task.dueDate,
            created_at: task.createdAt,
            updated_at: task.updatedAt,
        }
    }
}