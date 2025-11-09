import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/login' element={token ? <Navigate to='/dashboard' /> : <LoginPage />} />
        <Route path='/register' element={token ? <Navigate to='/dashboard' /> : <RegisterPage />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path='/cart' element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        } />
        <Route path='/profile' element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path='/' element={<Navigate to={token ? '/dashboard' : '/login'} />} />
      </Routes>
    </>
  );
}

export default App;
