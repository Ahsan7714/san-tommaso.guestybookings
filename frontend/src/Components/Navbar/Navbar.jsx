import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  const phoneNumber = '+393394085200';
  const emailAddress = 'info@santommaso.com';
  const whatsappNumber = '+393312128059'; // Change this to your WhatsApp number

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    // Open Gmail with a new email draft
    window.location.href = `mailto:?to=${emailAddress}`;
  };

  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className='flex w-full justify-between lg:justify-between items-center h-[70px] lg:h-[80px] bg-white shadow-lg sticky lg:w-full top-0 z-50 font-poppins'>
      <div className='flex lg:pl-10  lg:gap-10 text-[#9d155c] lg:text-[#f8aa48] text-[40px] lg:text-[30px] items-center'>
        <Link onClick={handlePhoneClick}>
          <FaPhone className='hover:text-[#9d155c] transition-colors duration-500 hidden lg:block md:block' />
        </Link>
        <Link onClick={handleEmailClick}>
          <RiMailOpenFill className='hover:text-[#9d155c] transition-colors duration-500 hidden lg:block md:block'/>
        </Link>
        <Link onClick={handleWhatsappClick}>
          <FaWhatsapp className='hover:text-[#9d155c] transition-colors duration-500 pl-1 hidden lg:block md:block lg:pl-0'/>
        </Link>
      </div>
      <div>
        <Link to={"/"}>
          <img
            src="https://www.santommaso.com/wp-content/uploads/2021/03/logo2021.png"
            alt=""
            className='lg:h-[80px] lg:w-[160px] h-[65px] w-[140px] px-3 lg:px-0'
          />
        </Link>
      </div>
      <div className='flex items-center gap-6'>
        <Link to={"/properties"} className='bg-[#9d155c] h-[70px] lg:h-[80px] w-[100px] lg:w-[140px] flex justify-center items-center '>
          <span className='text-[20px] text-white' >Book</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
