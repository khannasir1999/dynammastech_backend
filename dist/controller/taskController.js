"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel_1.default.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = await taskModel_1.default.create({ title, description, dueDate, priority });
        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, completed } = req.body;
        const updatedTask = await taskModel_1.default.findByIdAndUpdate(id, { title, description, dueDate, priority, completed }, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskModel_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: deletedTask,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map