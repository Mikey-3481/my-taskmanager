import { v4 as uuidv4 } from "uuid";
const tasks = [];

const getTasks = (req, res) => {
  const { status, page = 1, limit = 5 } = req.query;
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);

  res.json({
    total: filteredTasks.length,
    tasks: filteredTasks.slice(startIndex, endIndex),
  });
};

const getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

const createTask = (req, res) => {
  const { title, description, status } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    !["pending", "in progress", "completed"].includes(status)
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { title, description, status } = req.body;
  const taskToUpdate = tasks.find((task) => task.id === req.params.id);

  if (!taskToUpdate) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title && typeof title === "string") taskToUpdate.title = title;
  if (description) taskToUpdate.description = description;
  if (status) {
    if (!["pending", "in progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    taskToUpdate.status = status;
  }

  res.json(taskToUpdate);
};

const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
