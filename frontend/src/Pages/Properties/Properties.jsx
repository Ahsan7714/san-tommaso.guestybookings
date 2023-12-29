import { Link } from "react-router-dom"
import DatePicker from "../../Components/DatePicker/DatePicker"
import "./Properties.css"
import { FaPerson ,FaBuilding   } from "react-icons/fa6";
import { FaBath, FaBed } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalContext } from '../../context/contextProvider'
const Properties = () => {
const {allProperties,getProperties,loading} = useLocalContext();
  
    
    useEffect(() => {
      getProperties("2021-10-10","2021-10-11",2);
      console.log({allProperties});
    }, []);
  
    if (loading) {
      return <p>Loading...</p>; // You can replace this with a loading spinner or any other UI indication
    }
    
    const universalDiscription="This Property is amazing and you will love it.It is located in the heart of the city and you will love it.The reasons to choose this property are alo.Even they are countless.Beautifull valley , modern architecture and many more.Nature is just side by you . you will love it.Just try it once else you will have a regret to not visit the heaven on earth."

  return (
    <div >

<div className="banner_container">
    <div className="banner">
        
        <div className="banner_text">
        <h1>Find your properties according to your intrest! </h1>
        </div>
    </div>
</div>

<form className="search_form  -translate-y-16 py-4 flex flex-col items-center w-fit   justify-center mx-auto shadow-xl ">
    <div className="upper_form  ">
<DatePicker/>
    </div>
</form>


<div className="cards_container">
{
    allProperties &&  allProperties.map((property, index) => {
        return (
            <div className="card" key={index}>
                <div className="card_img">
                    {
                        property.picture.large ? <img src={property.picture.large} alt=""/> : <img src={property.picture.thumbnail} alt=""/>
                    }
                </div>
                <div className="card_text">
                    <div className= "upper">
                    <h1 className="title">{property.title}</h1>
                    <span className="address">
                    <span>{property.address.city}</span>
                    <span>{property.address.country}</span>

                    </span>
                    </div>
                    <div className="description">
                        {
                            property?.publicDescription?.summary ? <p>{property?.publicDescription?.summary?.slice(0,300)}...</p> : <p>{universalDiscription}</p>
                        }
                        
                    </div>
                    <div className="bottom">
                    <span>

                    <FaBuilding/>
                    <p>

{ property.propertyType} 
                    </p>
                    </span>
                    <span>

<FaPerson/>
<p>
{property.accommodates}
</p>
                    </span>
                    <span>

<FaBed />
<p>

{property.bedrooms}
</p>
                    </span>
                    <span>

<FaBath />
<p>

{property.bathrooms}
</p>
                    </span>

                    </div>
                </div>
                <div className="pricing">
                    <p>{property.prices.basePrice} {property.prices.currency}</p>

                    <Link to={`/properties/${property._id}`}><button>Book Now</button></Link>
                    <Link to={`/properties/${property._id}`} ><button className="details_btn">View Details</button></Link>


                </div>
            </div>
        );
    })
}


</div>

    </div>
    

  )
}

export default Properties