import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const Fotter = () => {
  const { navigate } = useContext(ShopContext); // Hook for navigation

  // Functions to handle navigation
  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutClick = () => {
    navigate("/about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40'>
        <div>
          <img src={assets.logo} className='mb-[-5px] mt-5 w-35 h-35' alt='' />
          <Title
            text1={"MADE BY"}
            text2={" 'PA' DEVELOPMENT "}
            text3={"CENTER"}
          />
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li onClick={handleHomeClick} className='cursor-pointer'>
              HOME
            </li>
            <li onClick={handleAboutClick} className='cursor-pointer'>
              ABOUT
            </li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+251 985-24-14-04</li>
            <li>haileyesuseyasu@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2024@ pa_jersey.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Fotter;
