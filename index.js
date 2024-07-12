import bodyParser from "body-parser";
import express from "express";
import { DataTypes, Sequelize } from "sequelize";
import Task from "./models/task.js";
import User from "./models/user.js";

const app = express();
const port = 8080;

// Connect to PostgreSQL with Sequelize
const sequelize = new Sequelize(
  "postgres://admin:root@localhost:5432/task_manager"
);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const models = {
  User: User(sequelize, DataTypes),
  Task: Task(sequelize, DataTypes),
};

sequelize.sync();

// Get all tasks
app.get("/task", async (req, res) => {
  const tasks = await models.Task.findAll();
  res.json(tasks);
});

// Create a new task
app.post("/task", async (req, res) => {
  const { title, description, assigneeId, completed } = req.body;
  const newTask = await models.Task.create({ title, description, assigneeId, completed });
  res.json(newTask);
});

// Update a task
app.put("/task/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description, assigneeId, completed } = req.body;

  const [rowsUpdated] = await models.Task.update(
    { title, description, assigneeId, completed },
    { where: { id: taskId } }
  );

  if (rowsUpdated === 0) {
    res.status(404).json({ error: "Task not found" });
  } else {
    const updatedTask = await models.Task.findByPk(taskId);
    res.json(updatedTask);
  }
});

// Delete a task
app.delete("/task/:id", async (req, res) => {
  const taskId = req.params.id;

  const rowsDeleted = await models.Task.destroy({ where: { id: taskId } });

  if (rowsDeleted === 0) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json({ message: "Task deleted successfully" });
  }
});
