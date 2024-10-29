CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskTitle VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATE,
  priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Low',
  category VARCHAR(255)
);
