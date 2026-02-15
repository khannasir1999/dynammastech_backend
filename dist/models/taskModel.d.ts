import { Types, Document } from 'mongoose';
export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
    completed: boolean;
}
declare const TaskModel: import("mongoose").Model<ITask, {}, {}, {}, Document<unknown, {}, ITask, {}, import("mongoose").DefaultSchemaOptions> & ITask & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITask>;
export default TaskModel;
//# sourceMappingURL=taskModel.d.ts.map