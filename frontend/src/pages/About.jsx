import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
// import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={" US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_us} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            PA Jerseys is where passion meets style, offering premium jerseys
            through an easy-to-use online shopping platform. Our collection lets
            you wear your pride and stand out in every game-day moment. Elevate
            your fan experience with us!
          </p>
          <p>
            Each jersey is crafted with top-notch materials to ensure comfort
            and durability. We cater to fans of all ages, making it easy for
            everyone to showcase their team spirit. At PA Jerseys, your love for
            the game inspires everything we do!
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            To bring fans closer to the game they love by providing high-quality
            jerseys that combine comfort, style, and affordability.
          </p>
        </div>
      </div>
      <div className=' text-xl py-4'>
        <Title text1={"WHY"} text2={" CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>
            Every jersey undergoes rigorous quality checks to ensure it meets
            our high standards. We are committed to delivering products you can
            trust and love.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className=' text-gray-600'>
            Our platform is designed for effortless shopping with a
            user-friendly interface and fast, reliable delivery options,
            bringing your favorite jerseys straight to your door.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className=' text-gray-600'>
            We are dedicated to providing a top-notch customer experience,
            offering prompt support and personalized assistance to ensure your
            complete satisfaction.
          </p>
        </div>
      </div>
      {/* <NewsLetterBox /> */}
    </div>
  );
};

export default About;
