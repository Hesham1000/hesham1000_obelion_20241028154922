```javascript
const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('customApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Task extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      taskTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, { 
      sequelize, 
      modelName: 'tasks', // Ensure the modelName matches the table name in the database
      timestamps: false 
    });
  }
}

module.exports = Task;
```