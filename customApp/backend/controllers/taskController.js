```javascript
const { Task } = require('../models'); // Updated to match model name
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = new Sequelize('customApp', 'root', 'root', {
  host: 'db', // Replaced 'localhost' with 'db'
  dialect: 'mysql',
  port: 3306,
});

const createTasksTableSQL = fs.readFileSync(
  path.resolve(__dirname, '../../database/migrations/create_tasks_table.sql'),
  'utf8'
);
const seedTasksSQL = fs.readFileSync(
  path.resolve(__dirname, '../../database/seeders/seed_tasks.sql'),
  'utf8'
);

async function createTask(req, res) {
  try {
    const { taskTitle, description, dueDate, priority, category } = req.body;
    const newTask = await Task.create({ // Updated to use Task model
      taskTitle,
      description,
      dueDate,
      priority,
      category,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll(); // Updated to use Task model
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { taskTitle, description, dueDate, priority, category } = req.body;
    const task = await Task.findByPk(id); // Updated to use Task model
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ taskTitle, description, dueDate, priority, category });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id); // Updated to use Task model
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
```