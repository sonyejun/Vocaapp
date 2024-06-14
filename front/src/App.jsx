import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import useTokenManagement from './services/tokenManagement';
import PublicRoute from './routes/PublicRoute';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Folderboard from './pages/Folderboard/Folderboard';
import Wordboard from './pages/Wordboard/Wordboard';

const App = () => {

  const isTokenChecked = useTokenManagement();
  
  const privateRoutes = [
    { path: '/', element: <Dashboard /> },
    { path: '/folder', element: <Folderboard /> },
    { path: '/word', element: <Wordboard /> },
    { path: '/word/:folderId', element: <Wordboard /> }
  ];

  const publicRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> }
  ];

  if (!isTokenChecked) {
    return null;
  }

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
};

export default App;
