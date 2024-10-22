import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Category() {
  const [categories, setCategories] = useState([]); // State to hold categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, []);

  return (
    <div>
      <div className='lg:px-32'>
      <ul className='flex space-x-3 lg:space-x-5 p-2 lg:p-5 lg:px-10'>
        {categories.map((category) => (
          <li className='rounded-full border text-sm border-red-500 text-red-500 p-2 lg:p-4 w-auto lg:w-40 text-center hover:cursor-pointer' key={category.idCategory}>{category.strCategory}</li> // Display each category
        ))}
      </ul>

      </div>
      
    </div>
  );
}

export default Category;
