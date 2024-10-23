// src/App.js
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import your Dashboard component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token'); // Assuming you store a token in local storage

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
