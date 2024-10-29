import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskPage.css';

function TaskPage() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [category, setCategory] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('https://customApp-backend.cloud-stacks.com/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Failed to retrieve tasks', error));
  }, []);

  const handleCreateTask = () => {
    const newTask = {
      taskTitle,
      description,
      dueDate,
      priority: priorityLevel,
      category,
    };

    axios.post('https://customApp-backend.cloud-stacks.com/api/tasks', newTask, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setTasks([...tasks, response.data]);
      setTaskTitle('');
      setDescription('');
      setDueDate('');
      setPriorityLevel('');
      setCategory('');
    })
    .catch(error => console.error('Failed to create task', error));
  };

  return (
    <div className="task-page">
      <header className="task-page-header">
        Task Creation
      </header>
      <nav className="task-page-navigation">
        <ul>
          <li>Home</li>
          <li>Tasks</li>
          <li>Categories</li>
        </ul>
      </nav>
      <main className="task-page-main">
        <form className="task-page-form">
          <label>
            Task Title
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Due Date
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label>
            Priority Level
            <select
              value={priorityLevel}
              onChange={(e) => setPriorityLevel(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </form>
        <section className="task-list">
          <h2>Task List</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <h3>{task.taskTitle}</h3>
                <p>{task.description}</p>
                <p>Due: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                <p>Category: {task.category}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="task-page-footer">
        <a href="#">Help</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
      </footer>
    </div>
  );
}

export default TaskPage;
