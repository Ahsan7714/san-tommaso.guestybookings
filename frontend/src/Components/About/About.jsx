import React from "react";
import about from '../../assets/about2.jpg';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const About = () => {
  const { t } = useTranslation(); // Hook to access translation function

  return (
    <div className="flex lg:flex-row flex-col lg:h-[120vh] py-5 lg:py-0 mt-[0px] lg:mt-[100px] mb-[80px] bg-gray-200 w-full rounded-md">
      <div className="flex lg:w-[50%] flex-col px-6 lg:px-12 py-10 gap-6">
        <h1 className="lg:text-[35px] text-[33px] font-semibold text-[#10275b]">{t('aboutTitle')}</h1>
        <p>
          {t('aboutDescription1')}
        </p>
        <p>
          {t('aboutDescription2')}
        </p>
        <p>
          {t('aboutDescription3')}
        </p>
        <p>
          {t('aboutDescription4')}
        </p>
      </div>
      <div className="lg:w-[50%] px-2 lg:px-0">
        <img src={about} alt="" className="w-[100%] lg:h-[120vh] object-cover" />
      </div>
    </div>
  );
};

export default About;
