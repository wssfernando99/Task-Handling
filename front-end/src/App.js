// import React from 'react'
// import { BrowserRouter } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import Edittask from './pages/Edittask';
// import Deletetask from './pages/Deletetask';
// import Showtask from './pages/Showtask';
// import Createtask from './pages/Createtask';

// const App = () => {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Homepage />} />
//       <Route path='/createtask' element={<Createtask />} />
//       <Route path='/edittask' element={<Edittask />} />
//       <Route path='/deletetask' element={<Deletetask />} />
//       <Route path='/showtask' element={<Showtask />} />
//     </Routes>
//     </BrowserRouter>
//   )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks'); // Replace with your API endpoint
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:3001/tasks', { title: newTask }); // Replace with your API endpoint
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId, newTitle) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${taskId}`, { title: newTitle }); // Replace with your API endpoint
      const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, title: newTitle } : task));
      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async taskId => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`); // Replace with your API endpoint
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Management</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                />
                <button onClick={() => updateTask(task.id, newTask)}>Update</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {task.title}
                <button onClick={() => setEditingTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default App;