import React, { useState } from 'react';
import axios from 'axios';
import './TaskCreation.js.css';

function TaskCreation() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleCreateTask = async () => {
    const newTask = {
      taskTitle,
      description,
      dueDate,
      priority,
      category
    };

    try {
      const response = await axios.post('https://customApp-backend.cloud-stacks.com/api/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Task Created:', response.data);
      setTaskTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setCategory('');
      setError('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="task-creation">
      <header className="task-creation-header">
        <h1>Task Creation</h1>
      </header>
      <div className="task-creation-body">
        <nav className="task-creation-nav">
          <ul>
            <li>Home</li>
            <li>Tasks</li>
            <li>Settings</li>
          </ul>
        </nav>
        <form className="task-creation-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <label>Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </form>
      </div>
      <footer className="task-creation-footer">
        <a href="#">Help</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
      </footer>
    </div>
  );
}

export default TaskCreation;
