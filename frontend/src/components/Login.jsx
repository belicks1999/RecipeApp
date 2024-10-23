import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [error,setError]=useState("");
  const navigate = useNavigate();
  // Form validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      
      try {
        // Send a POST request to the registration endpoint
        const response = await axios.post('https://recipe-app-backend-seven.vercel.app/api/auth/login', {
          
          email: values.email,
          password: values.password,
        });

        if (response.data) {
          localStorage.setItem('token', response.data.token);
          toast.success('Login Succesful !');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error logging user:', error);
        toast.error('Login Failed!');
        setError("Login failed");
      }
    },
  });

  return (
    <div className='bg-neutral-300 h-screen flex justify-center items-center'>
      <ToastContainer />
      <div className='bg-white p-10 rounded-lg max-w-md w-auto lg:w-96 flex flex-col'>
       
        <img src={logo} alt="logo" className='w-24 mb-6 mx-auto mt-7' />
        <p className='text-lg font-semibold mb-3'>Login</p>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="relative mb-6">
            <input
              type="text"
              id="email"
              name="email"
              className={`border p-2 w-full rounded peer ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              required
            />
            <label
              htmlFor="email"
              className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                ${(formik.values.email || formik.touched.email) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                bg-white text-gray-500`}
            >
              Email address
            </label>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className={`border p-2 w-full rounded peer ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label
              htmlFor="password"
              className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                ${(formik.values.password || formik.touched.password) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                bg-white text-gray-500`}
            >
              Password
            </label>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button type="submit" className='bg-red-400 text-white py-2 rounded w-full'>
            Sign in
          </button>
        </form>
        <p className='text-center text-xs text-red-500 font-bold mt-3'>{error}</p>
        <p className='text-xs mt-10 text-center font-semibold'>Don't have an account? <Link to='/register'><span className='text-red-500 hover:cursor-pointer'>Create an account </span></Link>  </p>
      </div>
    </div>
  );
}

export default Login;
