import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });
  
    res.status(201).json({
      success: "True",
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error)
  }
};

export const getMyTask = async (req, res, next) => {
 try {
  const userId = req.user._id;

  const tasks = await Task.find({ user: userId });

  res.status(200).json({
    success: "true",
    tasks,
  });
 } catch (error) {
    next(error)
 }

};
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

  // if(!task)return res.status(400).json({
  //   success:"false",
  //   message:"Task not Found!"
  // })

  //shortcut for handling error
  // if(!task) return next(new Error("Task not Found!"))        //the use of next is in app.js , made function for that

  // here i use constructor that i made in error js file for specify the statusCode also!
  if (!task) return next(new ErrorHandler("Task can not be found ", 404));

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: "true",
    message: "Your task is updated",
  });
  } catch (error) {
    next(error )
  }
};

export const deleteTask = async (req, res, next) => {
 try {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new ErrorHandler("Task not Found!",404)); //the use of next is in app.js , made function for that

  await task.deleteOne();

  res.status(200).json({
    success: "true",
    message: "Your task is Deleted",
  });
 } catch (error) {
  next(error)
 }
};
