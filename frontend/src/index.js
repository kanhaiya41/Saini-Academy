import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admission from './components/Admission';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Admissions' element={<Admission />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
