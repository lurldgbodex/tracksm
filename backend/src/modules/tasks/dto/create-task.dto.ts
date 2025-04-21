import { IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    status: TaskStatus;

    due_date: Date;
}