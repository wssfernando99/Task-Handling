import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Edittask from './pages/Edittask';
import Deletetask from './pages/Deletetask';
import Showtask from './pages/Showtask';
import Createtask from './pages/Createtask';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/createtask' element={<Createtask />} />
      <Route path='/edittask/:id' element={<Edittask />} />
      <Route path='/deletetask/:id' element={<Deletetask />} />
      <Route path='/showtask/:id' element={<Showtask />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App;
