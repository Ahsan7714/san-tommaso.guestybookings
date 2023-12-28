import React from 'react';
import img1 from "../../assets/about.jpg";
import img2 from "../../assets/about1.jpg";
import img3 from "../../assets/bgcon.jpg";
import img4 from "../../assets/about.jpg";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carasoul.css'; // Add your custom styles here

const Carasoul = () => {
  const data = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img1 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800, // Adjust speed for smooth transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0', // Adjust the padding as needed
    autoplay: true,
    autoplaySpeed: 3000, // Adjust as needed for timing
    fade: true, // Enable fade transition
    cssEase: 'linear', // Use linear easing for smoother fade
    responsive: [
      {
        breakpoint: 768, // for screens smaller than 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className='w-full relative'>
      <Slider {...settings}>
        {data.map((d, index) => (
          <div key={index} className="bg-white h-[0px] text-black">
            <div className='flex justify-center items-center '>
              <img
                src={d.img}
                alt=""
                className="image-transition relative h-[450px] w-full lg:h-[100vh] lg:w-full rounded-sm flex object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className='absolute lg:top-[35%] top-[60%] bg-[#ffffff56] rounded-sm backdrop-filter backdrop-blur-[4px] lg:py-8 lg:px-7 px-4 py-2 w-[80%]  lg:w-[40%]'>
        <h1 className="lg:text-[35px] text-[20px]">VILLA NOCETA</h1>
        <p className='lg:text-[20px] text-[16px] pb-4'>MAGLIANO SABINA, LAZIO-UMBRIA</p>
        <p className='lg:text-[18px] text-[14px] text-[#000000b4] border-t border-[#0000003a] lg:py-4'>A comfortable and spacious villa for six in an untouched pocket of central Italy, yet within easy reach of Rome</p>
      </div>
    </div>
  );
};

export default Carasoul;
