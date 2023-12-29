import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import GoogleTranslateButton from '../Translator/Translator';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='flex w-full justify-between lg:justify-between items-center h-[70px] lg:h-[80px] bg-white shadow-lg sticky lg:w-full top-0 z-50'>
      <div className='flex lg:pl-10  lg:gap-10 text-[#9d155c] lg:text-[#f8aa48] text-[40px] lg:text-[30px] items-center'>
        <Link><FaPhone className='hover:text-[#9d155c] transition-colors duration-500 hidden lg:block md:block '/></Link>
        <Link><RiMailOpenFill className='hover:text-[#9d155c] transition-colors duration-500 hidden lg:block md:block'/></Link>
        <Link><FaWhatsapp className='hover:text-[#9d155c] transition-colors duration-500 pl-1 lg:pl-0'/></Link>
      </div>
      <div>
      <Link to={"/"}>

        <img
          src="https://www.santommaso.com/wp-content/uploads/2021/03/logo2021.png"
          alt=""
          className='lg:h-[80px] lg:w-[160px] h-[65px] w-[140px]'
        />
      </Link>
      </div>
      <div className='flex gap-5'>
        <div className=''>
          <GoogleTranslateButton />
        </div>
        <Link to={"/properties"} className='bg-[#9d155c] h-[70px] lg:h-[80px] w-[100px] lg:w-[140px] flex justify-center items-center'>
          <span className='text-[20px] text-white' >Book</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
