import React from 'react';
import Registration from './Registration';
import Login from './Login';
import TaskCreation from './TaskCreation';
import Reminder from './Reminder';
import Reports from './Reports';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Manager App</h1>
      </header>
      <main>
        <Registration />
        <Login />
        <TaskCreation />
        <Reminder />
        <Reports />
      </main>
    </div>
  );
}

export default App;
