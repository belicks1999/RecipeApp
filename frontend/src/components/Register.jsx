import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../assets/images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

  const [error,setError]=useState("");
  const navigate = useNavigate();
  // Form validation schema with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, 'Must be a valid mobile number')
      .min(10, 'Mobile number must be at least 10 digits')
      .required('Mobile is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) =>  {
     
      
      try {
        // Send a POST request to the registration endpoint
        const response = await axios.post('https://recipe-app-backend-seven.vercel.app/api/auth/register', {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
        });

        if (response.data) {
          toast.success('Registration Succesful !');
          navigate('/');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Registration Failed !');
        setError("Your Registration Failed, Try again");
      }
    },
  });

  return (
    <div className='bg-neutral-300 h-screen flex justify-center items-center'>
      <ToastContainer />
      <div className='bg-white p-10 lg:px-20 rounded-lg lg:max-w-xl w-80 lg:w-full flex flex-col'>
        <img src={Logo} alt="logo" className='w-24 mb-6 mx-auto mt-7' />
        <p className='text-lg font-semibold mb-3'>Register</p>

        <form onSubmit={formik.handleSubmit}>
          {/* First Name and Last Name */}
          <div className='lg:flex lg:space-x-4 lg:mb-6'>
            <div className='relative w-full lg:w-1/2'>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`border mb-2 lg:mb-0 p-2 w-full rounded peer ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <label
                htmlFor="firstName"
                className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                  ${(formik.values.firstName || formik.touched.firstName) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                  bg-white text-gray-500`}
              >
                {formik.values.firstName || formik.touched.firstName?'First Name *':'First Name '}
              </label>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm mb-2 lg:mb-0">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className='relative w-full lg:w-1/2'>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`border  mb-2 lg:mb-0 p-2 w-full rounded peer ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="lastName"
                className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                  ${(formik.values.lastName || formik.touched.lastName) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                  bg-white text-gray-500`}
              >
                {formik.values.lastName || formik.touched.lastName?'Last Name *':'Last Name '}
              </label>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm mb-2 lg:mb-0">{formik.errors.lastName}</div>
              ) : null}
            </div>
          </div>

          {/* Email and Mobile */}
          <div className='lg:flex lg:space-x-4 lg:mb-6'>
            <div className='relative w-full lg:w-1/2'>
              <input
                type="email"
                id="email"
                name="email"
                className={`border mb-2 lg:mb-0 p-2 w-full rounded peer ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="email"
                className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                  ${(formik.values.email || formik.touched.email) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                  bg-white text-gray-500`}
              >
                {formik.values.email || formik.touched.email?'Email *':'Email'}
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mb-2 lg:mb-0">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className='relative w-full lg:w-1/2'>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className={`border mb-2 lg:mb-0 p-2 w-full rounded peer ${formik.touched.mobile && formik.errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="mobile"
                className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                  ${(formik.values.mobile || formik.touched.mobile) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                  bg-white text-gray-500`}
              >
                {formik.values.mobile || formik.touched.mobile?'Mobile *':'Mobile'}
              </label>
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-red-500 text-sm mb-2 lg:mb-0">{formik.errors.mobile}</div>
              ) : null}
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className='lg:flex lg:space-x-4 lg:mb-6'>
            <div className='relative w-full lg:w-1/2'>
              <input
                type="password"
                id="password"
                name="password"
                className={`border mb-2 lg:mb-0 p-2 w-full rounded peer ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="password"
                className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                  ${(formik.values.password || formik.touched.password) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                  bg-white text-gray-500`}
              >
                 {formik.values.password || formik.touched.password?'Password *':'Password'}
              </label>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mb-2 lg:mb-0">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className='relative w-full lg:w-1/2'>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`border mb-4 lg:mb-0 p-2 w-full rounded peer ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute px-2 left-3 top-0 transition-all transform origin-[0] 
                  ${(formik.values.confirmPassword || formik.touched.confirmPassword) ? '-translate-y-3 scale-75' : 'top-2 scale-100'} 
                  bg-white text-gray-500`}
              >
                {formik.values.confirmPassword || formik.touched.confirmPassword?'Confirm Password *':'Confirm Password'}
              </label>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mb-4 lg:mb-0">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className='bg-red-400 text-white py-2 rounded px-3'>
            Create Account
          </button>
        </form>
        <p className='text-center text-xs text-red-500 font-bold mt-5'>{error}</p>
        <p className='text-xs mt-5 text-center font-semibold'>Already have an account? <Link className='hover:cursor-pointer' to='/'><span className='text-red-500 '>Login</span></Link></p>
      </div>
    </div>
  );
}

export default Register;
