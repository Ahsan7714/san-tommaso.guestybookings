import React from "react";
import { FaPhone } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex flex-col  bg-gray-200">
      <div className=" flex lg:flex-row flex-col justify-between px-7 py-14 items-start border-b-[1px] border-gray-700">
        <div className="flex lg:flex-col gap-3 lg:w-[20%] text-[14px] text-[#000000be]">
          <p className="">
            Strada Comunale di Montegemoli, 148, 56045 Pomarance PI, Italië
          </p>
          <p>info@santommaso.com</p>
          <p className="font-semibold underline">+393394085200</p>
        </div>
        <div className="flex flex-col gap-3 lg:-ml-[10rem] items-center">
          <img
            src="https://www.santommaso.com/wp-content/uploads/2021/03/logo2021.png"
            alt=""
            className="h-[80px] w-[150px]"
          />
          <p className="text-[18px] text-[#10275b] font-bold">
            Agriturismo San Tommaso
          </p>
        </div>
        <div className="flex flex-col gap-3 font-semibold">
          <p>PRIVACY POLICY</p>
          <p>COOKIE POLICY</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center gap-16 text-[40px] pt-10 text-[#9d155c]">
        <Link><FaPhone className='hover:text-[#9d155c] transition-colors duration-500 '/></Link>
        <Link><RiMailOpenFill className='hover:text-[#9d155c] transition-colors duration-500'/></Link>
        <Link><FaWhatsapp className='hover:text-[#9d155c] transition-colors duration-500 pl-1 lg:pl-0'/></Link>
        </div>
        <div className="flex justify-center py-6 text-[14px]">
            <p>©Copyright.All rights reserved</p>
            {/* <GoogleTranslateButton/> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;