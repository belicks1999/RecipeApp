// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Category from './Category';
import Favourite from './Favourite';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        const response= await axios.post('https://recipe-app-backend-seven.vercel.app/api/auth/recipe',{ recipeId: id, userId: user.id });
        console.log("Favorite added:", response.data);
        toast.success('Recipe added to Favourite !');
        
    } catch (error) {
        console.error("Error adding favorite:", error);
        toast.error('Recipe already added to Favourite !');
    }
   
  }

  return (
    <>
      <Navbar activeComponent={activeComponent} onNavClick={handleNavClick} /> 
      <ToastContainer />
      <div className='bg-red-50 h-full'>
        {activeComponent === 'category' ? <Category hanldeFav={hanldeFav} user={user} /> : <Favourite user={user} />} 
      </div>
    </>
  );
};

export default Dashboard;
