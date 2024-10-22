// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Category from './Category';
import Favourite from './Favourite';
import axios from 'axios';
import User from '../../backend/Model/User';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [activeComponent, setActiveComponent] = useState('category'); // State to manage active component
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); 
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); 
      setUser(decoded.user); 
    } catch (error) {
      console.error("Failed to decode token:", error);
      navigate('/');
    }
  }, [navigate]);

  const handleNavClick = (component) => {
    setActiveComponent(component); // Update active component based on nav click
  };

  const hanldeFav=async(id)=>{
    try {
        const response= await axios.post('http://localhost:5000/api/auth/recipe',{ recipeId: id, userId: user.id });
        console.log("Favorite added:", response.data);
        
    } catch (error) {
        console.error("Error adding favorite:", error);
    }
   
  }

  return (
    <>
      <Navbar activeComponent={activeComponent} onNavClick={handleNavClick} /> 
      <div className='bg-red-50 h-full'>
        {activeComponent === 'category' ? <Category hanldeFav={hanldeFav} /> : <Favourite user={user} />} 
      </div>
    </>
  );
};

export default Dashboard;
