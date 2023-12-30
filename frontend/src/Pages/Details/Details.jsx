import React, { useState ,useEffect,useContext} from "react";
import Carasoul from "../../Components/DetailCarasoul/Carasoul";
import { FaBuilding, FaEuroSign, FaLocationArrow } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import BookingModel from "./BookingModel";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import Loading from "../../Components/Loading/Loading";


const Details = () => {
    const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
const {getSinglePropertyDetails,property,loading}= useContext(Context);
const {id}= useParams();
useEffect(() => {
  window.scrollTo(0, 0);
   getSinglePropertyDetails(id);
  console.log({property})
}, [id]);

useEffect(() => {
  const mapContainer = document.getElementById('leafletMap');
  if (mapContainer && !mapContainer._leaflet_id && property?.coordinates) {
    const latitude=property?.address?.lat;
    const longitude=property?.address?.lng;
    const map = L.map('leafletMap').setView([latitude, longitude], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup('Property Location')
      .openPopup();
  }
}, [property]);


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
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };

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

        <div className="lg:w-[100%] py-5 opacity-90">
          <h1 className="text-[30px] font-semibold pb-4">Map</h1>
          <div className="mb-10">

<MapContainer
center={{lat:property?.address?.lat,lng:property?.address?.lng}}
zoom={19}
style={{ height: '400px', width: '90%',margin:'auto',borderRadius:'10px',overflow:'hidden', }}
>
<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
attribution='© OpenStreetMap contributors'
/>
<Marker position={{lat:property?.address?.lat,lng:property?.address?.lng}}>
<Popup>
  A dummy location in San Francisco, CA.
</Popup>
</Marker>
</MapContainer>
</div>
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


