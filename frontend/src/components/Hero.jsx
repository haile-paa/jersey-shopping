import React from "react";
import { assets } from "../assets/assets";

import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { navigate } = useContext(ShopContext); // Hook to handle navigation

  const handleShopNowClick = () => {
    navigate("/collection"); // Navigate to the collection page
  };

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BEST SELLER</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            BE$T QUALITY
          </h1>
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={handleShopNowClick} // Add click handler here
          >
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      <img className='w-full sm:w-1/2' src={assets.hero} alt='' />
    </div>
  );
};

export default Hero;
