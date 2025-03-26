import React from 'react';

import './App.css';
import KeysPurchase from './components/KeysPurchase';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TaskManagement from './components/TaskManagement';
import EcommerceHome from './components/EcommerceHome';
import Wishlist from './components/Wishlist';
import Header from './components/Header';
import Cart from './components/Cart';

function App() {
 
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<EcommerceHome />} />
       <Route path='/wishlist' element={<Wishlist/>} />
       <Route path='/cart' element={<Cart/>}/>
      <Route path='/home' element={<TaskManagement/>} />
    </Routes>
   
    </BrowserRouter>
   
  );
}

export default App;
