import { Link } from "react-router-dom";
import DatePicker from "../../Components/DatePicker/DatePicker";
import "./Properties.css";
import { FaPerson, FaBuilding, FaBath, FaBed } from "react-icons/fa6";
import { useEffect } from "react";
import { useLocalContext } from '../../context/contextProvider'
import Loading from "../../Components/Loading/Loading";
import Contact from "../../Components/Contact/Contact";

const Properties = () => {
  const { allProperties, getProperties, loading } = useLocalContext();
  
  
  
  if (loading) {
    return <Loading />;
  }

  const sortedProperties = [...allProperties].sort((a, b) => {
    return a.accommodates - b.accommodates;
  });

  const universalDescription =
    "This Property is amazing and you will love it. It is located in the heart of the city and you will love it. The reasons to choose this property are also countless. Beautiful valley, modern architecture and many more. Nature is just side by you. You will love it. Just try it once else you will have a regret to not visit the heaven on earth.";

  return (
    <div className="font-poppins">
      <div className="banner_container">
        <div className="banner">
          <div className="banner_text">
            <h1>Find your properties according to your interest! </h1>
          </div>
        </div>
      </div>

      <form className="search_form -translate-y-16  flex flex-col items-center w-fit justify-center mx-auto shadow-md">
        <div className="upper_form ">
          <DatePicker />
        </div>
      </form>

      <div className="cards_container">
        {sortedProperties.length === 0 ? (
          <div className="no-results-message w-[100%] " style={{marginTop:"-70px"}}>
            <p className="text-center text-[#F7A948] mb-14 text-2xl font-bold">We’re sorry, we are not able to find any results. Please adjust the dates or send your request with “this” contact form.</p>
            <Contact/>
          </div>
        ) : (
          sortedProperties.map((property, index) => (
            <div className="card" key={index}>
              <div className="card_img">
                {property.picture.large ? (
                  <img src={property.picture.large} alt="" />
                ) : (
                  <img src={property.picture.thumbnail} alt="" />
                )}
              </div>
              <div className="card_text">
                <div className="upper">
                  <h1 className="title">{property.title}</h1>
                  <span className="address">
                    <span>{property.address.city}</span>
                    <span>{property.address.country}</span>
                  </span>
                </div>
                <div className="description">
                  {property?.publicDescription?.summary ? (
                    <p>
                      {property?.publicDescription?.summary?.slice(0, 300)}...
                    </p>
                  ) : (
                    <p>{universalDescription}</p>
                  )}
                </div>
                <div className="bottom">
                  <span>
                    <FaBuilding />
                    <p>{property.propertyType}</p>
                  </span>
                  <span>
                    <FaPerson />
                    <p>{property.accommodates}</p>
                  </span>
                  <span>
                    <FaBed />
                    <p>{property.bedrooms}</p>
                  </span>
                  <span>
                    <FaBath />
                    <p>{property.bathrooms}</p>
                  </span>
                </div>
              </div>
              <div className="pricing">
                <p>
                € {property.prices.basePrice} 
                </p>

                <Link to={`/properties/${property._id}`}>
                  <button className="details_btn font-poppins mt-5">View Details</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Properties;
