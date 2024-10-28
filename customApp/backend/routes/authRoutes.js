```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('customApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

// Define the User model to match the database schema
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authController.registerUser(email, password, User);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authController.loginUser(email, password, User);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
```