import React from "react";
import { FaPhone } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Footer = () => {
  const { t } = useTranslation(); // Hook to access translation function

  const phoneNumber = '+393394085200';
  const emailAddress = 'info@santommaso.com';
  const whatsappNumber = '+393312128059'; // Change this to your WhatsApp number

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="flex flex-col  bg-gray-200 font-poppins">
      <div className=" flex lg:flex-row flex-col gap-8 lg:gap-0 justify-between px-7 py-14 items-start border-b-[1px] border-gray-700">
        <div className="flex flex-col gap-3 lg:w-[20%] text-[14px] text-[#000000be]">
          <p className="">
            {t('address')}
          </p>
          <p>{emailAddress}</p>
          <p className="font-semibold underline">{phoneNumber}</p>
        </div>
        <div className="flex flex-col gap-3 lg:-ml-[10rem] items-center ml-14">
          <img
            src="https://www.santommaso.com/wp-content/uploads/2021/03/logo2021.png"
            alt=""
            className="h-[80px] w-[150px]"
          />
          <p className="text-[18px] text-[#10275b] font-bold">
            {t('companyName')}
          </p>
        </div>
        <div className="flex flex-col gap-3 font-semibold">
          <p>{t('privacyPolicy')}</p>
          <p>{t('cookiePolicy')}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center gap-16 text-[40px] pt-10 text-[#9d155c]">
          <Link onClick={handlePhoneClick}><FaPhone className='hover:text-[#9d155c] transition-colors duration-500 '/></Link>
          <Link onClick={handleEmailClick}><RiMailOpenFill className='hover:text-[#9d155c] transition-colors duration-500'/></Link>
          <Link onClick={handleWhatsappClick}><FaWhatsapp className='hover:text-[#9d155c] transition-colors duration-500 pl-1 lg:pl-0'/></Link>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center py-6 text-[14px]">
            <p>{t('allRightsReserved')}</p>
            <p>{t('developedBy')} <a href="https://www.fiverr.com/muhammadsarw200" className="underline" target="_blank" rel="noopener noreferrer">{t('developerName')}</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
