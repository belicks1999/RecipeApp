import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Category from './Category';

const Dashboard = () => {
  const [user, setUser] = useState({});
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

 

  return (

    <>
    
    <Navbar />
      <div className='bg-red-50 h-screen'>
      <Category/>
    </div>
    </>
    
  );
};

export default Dashboard;
