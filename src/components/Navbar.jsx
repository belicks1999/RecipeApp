import React from 'react'
import logo from '../assets/images/logo.jpg'
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
      };
  return (
    <div className='lg:px-32 flex justify-between bg-white'>
        <img src={logo} alt="logo" className='w-32 lg:w-40 p-5' />
        <div className='flex py-6 lg:py-7 no-underline space-x-2 lg:space-x-6'>
            <p>HOME</p>
            <p>FAVOURITE</p>
        </div>
        <div className='text-3xl lg:text-4xl p-5 cursor-pointer' onClick={handleLogout}>
        <IoLogOutOutline />
        </div>
        


    </div>
  )
}

export default Navbar