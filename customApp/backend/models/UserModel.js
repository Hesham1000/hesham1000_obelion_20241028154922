```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('customApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'User',
      timestamps: false,
      tableName: 'users'
    });
  }
}

module.exports = User;
```