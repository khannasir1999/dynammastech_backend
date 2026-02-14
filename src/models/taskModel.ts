import { model, Schema, Types, Document } from 'mongoose';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
    completed: boolean;
}

const TaskModel = model<ITask>('Task', taskSchema);

export default TaskModel;