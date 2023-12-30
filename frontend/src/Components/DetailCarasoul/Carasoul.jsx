import React, { useContext } from 'react';
import img1 from "../../assets/about.jpg";
import img2 from "../../assets/about1.jpg";
import img3 from "../../assets/bgcon.jpg";
import img4 from "../../assets/about.jpg";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carasoul.css'; // Add your custom styles here
import { Context } from '../../context/Context';

const Carasoul = () => {
  const {property}=useContext(Context);
  const data = [];
// Push all the images into the array
  property?.pictures.map((p)=>data.push({img:p.original?p.original:p.thumbnail}))


   
 
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 800, // Adjust speed for smooth transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0', // Adjust the padding as needed
    autoplay: true,
    autoplaySpeed: 2000, // Adjust as needed for timing
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
const universalDescription='A good plcae to stay, just like heaven on earth with all the facilities and a good view of the city.Touch the heart of nature and feel the beauty of the sky.';
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
      <div className='absolute lg:top-[35%] top-[60%] bg-[#ffffff56] w-fit rounded-sm backdrop-filter backdrop-blur-[4px] lg:py-8 lg:px-7 px-4 py-2 w-[80%]  lg:w-[40%] shadow-xl'>
        <h1 className="lg:text-[35px] text-[20px]">{property?.title}</h1>
        <p className='lg:text-[20px] text-[16px] pb-4'>{property?.address?.city}, {property?.address?.country} </p>
        <p className='lg:text-[18px] text-[14px] text-[#000000b4] border-t border-[#0000003a] lg:py-4'>

          {property?.publicDescription?property?.publicDescription?.summary?.slice(0,250):universalDescription.slice(0,250)}...
        </p>
      </div>
    </div>
  );
};

export default Carasoul;
