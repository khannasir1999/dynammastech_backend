import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = await TaskModel.create({ title, description, dueDate, priority });
        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
          });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error,
      });
    }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority, completed },
      { new: true, runValidators: true }
    );

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

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

 
