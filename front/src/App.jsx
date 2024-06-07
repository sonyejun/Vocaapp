import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import tokenRenewal from './services/tokenRenewal';
import PublicRoute from './routes/PublicRoute';
import { useAuth } from './contexts/AuthProvider';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Folderboard from './pages/Folderboard/Folderboard';

const App = () => {
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        setIsLoggedIn(true);
        await tokenRenewal(); // Attempt token renewal when the app loads
      }
    };

    checkLoginStatus();

    const renewalInterval = setInterval(() => {
      alert(11111)
      checkLoginStatus();
    }, 420000);

    return () => clearInterval(renewalInterval);
  }, []);


  const privateRoutes = [
    { path: '/', element: <Dashboard /> },
    { path: '/folder', element: <Folderboard /> }
  ];

  const publicRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> }
  ];

  return (
    <Router>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<PrivateRoute>{route.element}</PrivateRoute>} />
        ))}

        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<PublicRoute>{route.element}</PublicRoute>} />
        ))}
      </Routes>
    </Router>
  )
}

export default App;
