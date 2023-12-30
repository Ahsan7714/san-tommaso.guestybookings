import React, { useState ,useEffect,useContext} from "react";
import Carasoul from "../../Components/DetailCarasoul/Carasoul";
import about from "../../assets/about.jpg";
import con from "../../assets/bgcon.jpg";
import { FaBuilding, FaEuroSign, FaLocationArrow } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import BookingModel from "./BookingModel";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import Loading from "../../Components/Loading/Loading";


const Details = () => {
    const images = Array.from({ length: 5 }, (_, index) => index);
    const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
const {getSinglePropertyDetails,property,loading}= useContext(Context);
const {id}= useParams();
useEffect(() => {
  window.scrollTo(0, 0);
   getSinglePropertyDetails(id);
  console.log({property})
}, [id]);

useEffect(() => {
  // Check if the map container already has a map
  const mapContainer = document.getElementById('leafletMap');
  if (mapContainer && !mapContainer._leaflet_id) {
    // Create a map centered around a random location
    const map = L.map('leafletMap').setView([37.7749, -122.4194], 11);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker to the map
    L.marker([37.7749, -122.4194])
      .addTo(map)
      .bindPopup('Random Location')
      .openPopup();
  }
}, []);


  const openModal = () => {
    setIsSmallModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    if(loading){
      return <Loading/>
    }
    const formatHeading = (heading) => {
      // Convert camelCase to space-separated format
      const spacedString = heading.replace(/([a-z])([A-Z])/g, '$1 $2');
      // Capitalize the first letter of each word
      return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
    };

  return (
    <div className="bg-[#e5e7eb] mb-20 font-poppins">
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
              src={property?.pictures[0]?.large?property?.pictures[2].large:property?.pictures[2].original}
              alt=""
              className="h-[400px] w-[600px] rounded-lg shadow-md object-fit hidden lg:block md:block"
            />
          </div>
          {/* right side details */}
          <div className="flex  gap-5 px-4 lg:px-0 lg:pl-20 pt-3">
            <div className="flex flex-col gap-6">
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
              <div className="flex gap-3 items-center">
                <div className="text-[20px]">
                  <FaBuilding />
                </div>
                <p className="text-[20px] font-semibold">Property Type</p>
              </div>
              <div className="flex gap-3 items-center mt-1">
                <div className="text-[20px]">
                  <FaLocationArrow />
                </div>
                <p className="text-[20px] font-semibold">Address</p>
              </div>
            </div>
            {/* price, bedrooms, beds, bathrooms */}
            <div className="flex flex-col gap-8 text-[16px] pt-4">
              <p></p>
              <p className="pl-8 text-[17px]">{property?.prices?.currency} {property?.prices?.basePrice}</p>
              <p className="pl-8 text-[17px]">{property?.bedrooms}</p>
              <p className="pl-8 text-[17px]">{property?.beds}</p>
              <p className="pl-8 text-[17px]">{property?.bathrooms}</p>
              <p className="pl-8 text-[17px]">{property?.propertyType}</p>
              <p className="pl-8 text-[17px]">{property?.address?.full}</p>


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
            <img src={con} alt="" className="w-[100%] h-[140vh] rounded-sm" />
          </div>
        </div>

      </div>
      {/* Accommodation */}
      <div className="flex flex-col lg:px-24 px-5">
      <h1 className="text-[35px] font-semibold pb-3">{property?.title}</h1>
        
        <div className="flex flex-col ">
  {property?.publicDescription &&
    Object.entries(property.publicDescription).map(([key, value]) => (
      <div key={key}>
        <h1 className="pt-4 pb-2 text-[30px] capitalize">{ formatHeading(key)}</h1>
        <p>{value}</p>
      </div>
    ))}
</div>
        <div>
          <h1 className="pt-6 pb-2 text-[20px] font-semibold">
            Check in and out
          </h1>
          <p>Check In {property?.defaultCheckInTime}</p>
          <p>Check Out {property?.defaultCheckOutTime}</p>
        </div>
        {/* Amenities */}
        <div>
          <h1 className="pt-6 pb-2 text-[20px] font-semibold">Amenities</h1>
          <p>
            private pool, air conditioning, espresso machine, nespresso machine,
            hob/stove, oven, fridge with freezer, dishwasher, washing machine,
            tumble dryer, iron+board, television, wifi, cot, barbeque, hairdryer
          </p>
        </div>
        {/* map */}
        <div className="lg:w-[60%] py-5 opacity-90">
          <h1 className="text-[30px] font-semibold pb-4">Map</h1>
        <div id="leafletMap" className=" h-[400px] " />;
          <h1 className="pt-6 pb-2 text-[20px] font-semibold">
            Amenities
          </h1>
          <ul className="list_contianer_amenities">
            {property?.amenities?.map((amenity)=>(
              <li key={amenity}>{amenity}</li>
            ))}

          </ul>
        </div>
        {/* images */}
        <div className="pb-10">
          <h1 className="text-[30px] font-semibold pb-4">Images</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {images.map((index) => (
              <div key={index}>
                <img
                  src={about}
                  alt=""
                  className="lg:h-[300px] lg:w-[380px]  shadow-xl"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {property?.pictures.map((pic,index) => (
        <div key={index} className="w-full h-[270px]">
          <img src={pic?.large?pic?.large:pic.original?pic.original:pic.thumbnail} alt="" className="h-full  shadow-xl w-full " />
        </div>
      ))}
    </div>
        </div>
        {/* Book now button */}
        <div className="fixed bottom-5 right-5 ">
          <button
            className="bg-[#9d155c] shadow-lg text-white px-6 py-3 rounded-md"
            onClick={openModal}
          >
            Click to Book Now
          </button>
        </div>
        {/* Modal */}
        <BookingModel
          isSmallModalOpen={isSmallModalOpen}
          setIsSmallModalOpen={setIsSmallModalOpen}
        />
      </div>
    </div>
  );
};

export default Details;


