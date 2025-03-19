import React from 'react';

import './App.css';
import KeysPurchase from './components/KeysPurchase';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TaskManagement from './components/TaskManagement';

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<TaskManagement />} />
      {/*<Route path='/home' element={<Home/>} />*/}
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
