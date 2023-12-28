import React, { useState } from "react";
import Carasoul from "../../Components/DetailCarasoul/Carasoul";
import about from "../../assets/about.jpg";
import con from "../../assets/bgcon.jpg";
import { FaEuroSign } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import BookingModel from "./BookingModel";



const Details = () => {
    const images = Array.from({ length: 5 }, (_, index) => index);
    const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);

    const openModal = () => {
      setIsSmallModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div className="bg-[#e5e7eb]">
      {/* Carasoul */}
      <div className=" mt-22">
        <Carasoul />
      </div>
      {/* Navbar */}
      {/*Intro*/}

      <div className="flex flex-col  lg:px-24 lg:py-20">
        <div className="flex  lg:flex-row flex-col">
          {/* left side image */}
          <div>
            <img
              src={about}
              alt=""
              className="h-[400px] w-[600px] rounded-lg shadow-md object-fit hidden lg:block md:block"
            />
          </div>
          {/* right side details */}
          <div className="flex  gap-5 px-4 lg:px-0 lg:pl-20 pt-3">
            <div className="flex flex-col gap-5">
              <h1 className="text-[22px] font-semibold">Property Features</h1>
              <div className="flex gap-3 items-center">
                <div className="text-[20px]">
                  <FaEuroSign />
                </div>
                <p className="text-[20px] font-semibold">PRICE</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="text-[20px]">
                  <MdMeetingRoom />
                </div>
                <p className="text-[20px] font-semibold">Bedrooms</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="text-[20px]">
                  <FaBed />
                </div>
                <p className="text-[20px] font-semibold">Beds</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="text-[20px]">
                  <FaBath />
                </div>
                <p className="text-[20px] font-semibold">Bathrooms</p>
              </div>
            </div>
            {/* price, bedrooms, beds, bathrooms */}
            <div className="flex flex-col gap-7 text-[16px] pt-6">
              <p></p>
              <p className="pl-8 text-[17px]"> € 500 per week</p>
              <p className="pl-8 text-[17px]">8</p>
              <p className="pl-8 text-[17px]">16</p>
              <p className="pl-8 text-[17px]">4</p>
            </div>
          </div>
        </div>
        {/* name and description */}
        <div className="flex pt-20 gap-20">
          <div className="flex flex-1 flex-col  px-5 lg:px-0 ">
            <h1 className="text-[35px] font-semibold pb-3">VILLA NOCETA</h1>
            <p className="text-[18px]  border-t border-[#80808066] pt-2">
              Traditional architecture and modern interiors are perfectly
              matched in this elegant villa with its fabulous garden and
              beautiful pool
            </p>
            <div>
              <h1 className="pt-4 pb-2 text-[30px]">The Villa </h1>
              <p className=" ">
                Villa al Sole is made up of 2 apartments and 1 annex, and can
                accommodate up to 20 people. There are 8 bedrooms (5 doubles and
                3 rooms that can be used as quadruples, triples, twins or
                doubles if necessary), 5 bathrooms (each with shower, bidet,
                toilet, sink). The accommodations are on the ground floor, each
                with an independent entrance and each has its own equipped
                kitchen, barbecue, fridge, freezer, dishwasher, microwave, moka,
                toaster, kettle, American coffee machine. The MANDORLO apartment
                is about 100 square meters. There is a living room, kitchen with
                sofa and extendable table, two double bedrooms, two bathrooms
                with shower and a mezzanine with 4 single beds. The apartment Il
                FICO is about 120 square meters. There is a living room, kitchen
                with sofa and extendable table, two bedrooms with double bed,
                two bathrooms with shower and two mezzanines, one with double
                bed and one with 2 beds, if necessary it is possible to add 2
                more single beds. L'OLMO is a 36 square meters dépendance with
                an independent entrance in the garden near the swimming pool. It
                has a private space with table, deck chairs and a beautiful
                panorama. Internally a comfortable double bed, a full kitchen,
                dining table and bathroom with shower. It can accommodate up to
                3 people with an extra bed.
              </p>
            </div>
          </div>
          <div className="flex-1 hidden lg:block md:block">
            <img src={con} alt="" className="w-[100%] h-[100vh] rounded-sm" />
          </div>
        </div>
      </div>
      {/* Accommodation */}
      <div className="flex flex-col lg:px-24 px-5">
        <div>
          <h1 className="pt-4 pb-2 text-[30px]">Guest Access</h1>
          <p>
            Villa AL SOLE is part of the Agriturismo San Tommaso, 2.5 km from
            the town of Pomarance, on the sunny side of a hill 200 m above sea
            level The absolute protagonist is the panorama of the endless valley
            and the SUN, which from morning to evening creates a wonderful light
            atmosphere until sunset with breathtaking landscapes. The typical
            Tuscan countryside with cultivated hills, olive trees and vineyards
            will immerse you in an atmosphere of relaxation and enjoying a
            holiday with friends and family.
          </p>
        </div>
        <div>
          <h1 className="pt-4 pb-2 text-[30px]">Space</h1>
          <p>
            The villa has been recently renovated and equipped to offer its
            guests the best hospitality in a refined Tuscan style. Stone, beams
            and terracotta ceilings left exposed. All apartments have air
            conditioning, a comfortable loggia and a gazebo for outdoor dining.
          </p>
          <p>
            All around an evergreen garden, a terrace with table and brazier for
            dining under the stars. Villa represents an ideal location to
            appreciate privacy and tranquility without having to give up the
            comforts located in the immediate vicinity. In fact, it is located 2
            km from the village of Pomarance with shops, restaurants and cafes.
            We are among the unique landscapes of the Val di Cecina, the land of
            the ancient villages (Pomarance, Volterra, Montecatini Val di
            Cecina), as well as the numerous oases and reserves, such as
            Berignone and Monterufoli, that surround the immediate surroundings.
            A few kilometres away are the sources of the Cecina River with
            beautiful waters for swimming and enjoying untouched nature. The
            villa is part of an organic farm producing extra virgin olive oil
            and quality wine, which can be tasted in the villa upon request.
          </p>
          <p>
            Upon request, we can organise breakfasts, lunches, dinners or
            tastings of local products.
          </p>
        </div>
        <div>
          <h1 className="pt-4 pb-2 text-[25px]">Interaction</h1>
          <p>
            I live here and take care of the garden, the pool, the vineyard and
            the olive trees. I am always at your disposal for any need and
            information.
          </p>
        </div>
        <div>
          <h1 className="pt-4 pb-2 text-[25px]">Other things to note</h1>
          <p>
            this apartment is located near a road and at certain times of the
            day there may be noises
          </p>
        </div>
        <div>
          <h1 className="pt-6 pb-2 text-[20px] font-semibold">
            Check in and out
          </h1>
          <p>Check in:15:00</p>
          <p>Check out:10:00</p>
        </div>
        {/* Amenities */}
        <div>
          <h1 className="pt-6 pb-2 text-[20px] font-semibold">
            Amenities
          </h1>
          <p>private pool, air conditioning, espresso machine, nespresso machine, hob/stove, oven, fridge with freezer, dishwasher, washing machine, tumble dryer, iron+board, television, wifi, cot, barbeque, hairdryer</p>
        </div>
        
        {/* images */}
        <div className="pb-10">
          <h1 className="text-[30px] font-semibold pb-4">Images</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {images.map((index) => (
        <div key={index}>
          <img src={about} alt="" className="lg:h-[300px] lg:w-[380px]  shadow-xl" />
        </div>
      ))}
    </div>
        </div>
        {/* Book now button */}
        <div className="fixed bottom-5 right-5 ">
          <button className="bg-[#9d155c] shadow-lg text-white px-6 py-3 rounded-md" onClick={openModal}>
           Click to Book Now
          </button>
        </div>
        {/* Modal */}
        <BookingModel isSmallModalOpen={isSmallModalOpen} setIsSmallModalOpen={setIsSmallModalOpen} />
      </div>
    </div>
  );
};

export default Details;
