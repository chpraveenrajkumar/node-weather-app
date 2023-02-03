const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  // res.status(200).json({ tasks });
  // res.status(200).json({ tasks, length: tasks.length });
  res
    .status(200)
    .json({ success: true, data: { tasks, length: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    return next(createCustomError(`no task id with ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const {
    params: { id: taskId },
    body,
  } = req;
  const task = await Task.findByIdAndUpdate({ _id: taskId }, body, {
    new: true, // returns original(new) document
    runValidators: true, // runs validators set on models schema
  });
  if (!task) {
    return next(createCustomError(`no task id with ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`no task id with ${taskId}`, 404));
  }
  // res.status(200).json({ task });
  // res.status(200).send();
  res.status(200).json({ task: null, status: "success" });
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
