// src/App.js
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import your Dashboard component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';

function App() {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token'); // Assuming you store a token in local storage

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
