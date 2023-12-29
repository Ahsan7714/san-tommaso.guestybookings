import { Link } from "react-router-dom";
import DatePicker from "../../Components/DatePicker/DatePicker";
import "./Properties.css";
import { FaPerson, FaBuilding, FaBath, FaBed } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalContext } from '../../context/contextProvider';

const Properties = () => {
  const [allproperties, setProperties] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { allProperties, getProperties, loading } = useLocalContext();
  
  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/processingOrders"
      );
      console.log(res.data);

      // Assuming the property you want is 'results'
      const propertiesFromServer = res.data.results || [];
      setProperties(propertiesFromServer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProperties("2021-10-10", "2021-10-11", 2);
    console.log({ allProperties });
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other UI indication
  }

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

      <form className="search_form flex flex-col items-center w-fit justify-center mx-auto shadow-md">
        <div className="upper_form -translate-y-16">
          <DatePicker />
        </div>
        <div className="bottom_form w-[100%] -translate-y-10">
          <div className="filter_options">
            <div className="filter_option">
              <label htmlFor="min_price">Min Price</label>
              <input
                type="number"
                name="min_price"
                id="min_price"
                placeholder="Min Price"
              />
            </div>
            <div className="filter_option">
              <label htmlFor="max_price">Max Price</label>
              <input
                type="number"
                name="max_price"
                id="max_price"
                placeholder="Max Price"
              />
            </div>
            <div className="filter_option">
              <label htmlFor="property_type">Property Type</label>
              <select name="property_type" id="property_type">
                <option value="all">All</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            <div className="filter_option">
              <label htmlFor="amenities">Amenities</label>
              <select name="amenities" id="amenities">
                <option value="all">All</option>
                <option value="gym">Gym</option>
                <option value="pool">Pool</option>
                <option value="parking">Parking</option>
                <option value="elevator">Elevator</option>
              </select>
            </div>
            <div className="filter_option">
              <label htmlFor="bedrooms">Bedrooms</label>
              <select name="bedrooms" id="bedrooms">
                <option value="all">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <div className="cards_container">
        {allproperties &&
          allproperties.map((property, index) => (
            <div className="card" key={index}>
              <form className="search_form -translate-y-16 py-4 flex flex-col items-center w-fit justify-center mx-auto shadow-xl">
                <div className="upper_form">
                  <DatePicker />
                </div>
              </form>

              <div className="cards_container">
                {allProperties &&
                  allProperties.map((property, index) => (
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
                          {property.prices.basePrice} {property.prices.currency}
                        </p>

                        <Link to={`/properties/${property._id}`}>
                          <button>Book Now</button>
                        </Link>
                        <Link to={`/properties/${property._id}`}>
                          <button className="details_btn">View Details</button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Properties;
