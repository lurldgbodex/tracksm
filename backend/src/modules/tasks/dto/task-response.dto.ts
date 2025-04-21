import { TaskStatus } from "../enums/task-status.enum";

export class TaskResponse {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
}