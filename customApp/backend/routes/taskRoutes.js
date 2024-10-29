```javascript
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Assuming taskController is implemented

// Define API endpoints for tasks

// GET /tasks - Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// POST /tasks - Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await taskController.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id - Update an existing task
router.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const updatedTask = await taskController.updateTask(taskId, taskData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await taskController.deleteTask(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
```

```javascript
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  taskTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Low',
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

module.exports = Task;
```

```javascript
// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_database_user', 'your_database_password', {
  host: 'db',
  dialect: 'mysql'
});

module.exports = sequelize;
```