```javascript
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel'); // Updated to match the table name 'users'
const sequelize = require('sequelize');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual secret key
    const user = await User.findOne({ where: { id: decoded.id } }); // Updated model name to 'User'

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = authMiddleware;
```