import React from 'react';

import './App.css';
import KeysPurchase from './components/KeysPurchase';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import EcommerceHome from './components/EcommerceHome';
import Wishlist from './components/Wishlist';
import Header from './components/Header';
import Cart from './components/Cart';
import Main from './components/Main';

function App() {
 
  return (
    <BrowserRouter>
    {/*<Header/>*/}
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Main/>} />
    </Routes>
   
    </BrowserRouter>
   
  );
}

export default App;
