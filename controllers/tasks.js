const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    // res.status(200).json({ tasks });
    // res.status(200).json({ tasks, length: tasks.length });
    res
      .status(200)
      .json({ success: true, data: { tasks, length: tasks.length } });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: `no task id with ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      params: { id: taskId },
      body,
    } = req;
    const task = await Task.findByIdAndUpdate({ _id: taskId }, body, {
      new: true, // returns original(new) document
      runValidators: true, // runs validators set on models schema
    });
    if (!task) {
      return res.status(404).json({ msg: `no task id with ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `no task id with ${taskId}` });
    }
    // res.status(200).json({ task });
    // res.status(200).send();
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
