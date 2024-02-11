import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../Components/DatePicker/DatePicker';
import About from '../../Components/About/About';
import Contact from '../../Components/Contact/Contact';
import { useLocalContext } from '../../context/contextProvider';

const Home = () => {
  const { getProperties } = useLocalContext();
  const { t } = useTranslation(); // Hook to access translation function
  useEffect(() => {
    getProperties();
  }, []); 

  return (
    <div>
      <div className='font-poppins relative'>
        <div className='bg-[#00000040] z-10'>
          <img src={"./images/IMG_4153.jpg"} alt="" className='relative h-[70vh] lg:h-[100vh] w-full object-cover -z-10' />
        </div>
        <div className='z-40 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white text-center'>
          <h1 className='text-[40px] font-bold'>{t('bookingTitle')}</h1> {/* Translate title */}
          <p className='text-[25px] font-semibold absolute lg:left-[40%] left-[29%]'>{t('enjoyMessage')}</p> {/* Translate message */}
        </div>
        <div className='-translate-y-16 shadow-2xl w-fit mx-auto'>
          <DatePicker source={"Home"}/>
        </div>
      </div>
      <About/>
      <Contact/>
    </div>
  );
}

export default Home;
