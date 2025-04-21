import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TaskStatus } from "../enums/task-status.enum";
import { User } from "src/modules/auth/entities/user.entity";

@Entity('tasks')
export class Task extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
    status: TaskStatus;

    @Column({ name: 'due_date', nullable: true })
    dueDate: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
