import { useContext, useState } from "react";
import { Context } from "./context";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { set } from "date-fns";

const ContextProvider = ({ children }) => {
    const [dates, setDates] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState('');
    const [allProperties, setAllProperties] = useState([]);
    const [property, setProperty] = useState();
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState();
    const [calendarData, setCalendarData] = useState();
    const [flag,setFlag]=useState(false);



    axios.defaults.withCredentials = true;
    const getProperties = async (checkIn , checkOut , count = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/listings`, {
                params: { checkIn, checkOut, count },
                withCredentials: true,
            });
            setAllProperties(res.data.results);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);

        }
        setLoading(false);

    };



    const getSinglePropertyDetails = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/listing/${id}`);
            setProperty(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    }


    const getQuote = async (checkInDate, checkOutDate, count, listingId) => {

        try {
            setLoading(true);
          const res = await axios.post(`${baseUrl}/listing/quote`, {
            checkInDate,
            checkOutDate,
            count,
            listingId,
          }, {
            withCredentials: true,
          });
      
          if (res.data.error ) {
            // Display error using toast
            toast.error(res.data.error.message);
            setQuote({error: res.data.error});
            setFlag(false);
            setLoading(false);
            return Error(res.data.error.message);
          } else {
            setQuote(res.data);
            setFlag(true);
            setLoading(false);
          }
            setLoading(false);
        } catch (error) {
          console.error(error);
          // Display a generic error message using toast
          toast.error('An error occurred. Please try again.');
          setLoading(false);
        }
        setLoading(false);
      };
      

const createInquiry=async(qouteId,firstName,lastName,email,phone,ratePlanId)=>{
    try {
        setLoading(true);
        const res = await axios.post(`${baseUrl}/listing/quote/${qouteId}/inquiry`,{firstName,lastName,email,phone,ratePlanId}, {
            withCredentials: true,
        });
        console.log(res.data);
        setLoading(false);
    } catch (error) {
        console.log(error);

        setLoading(false);
    }
    setLoading(false);
}


const getCalendarData=async(id)=>{
    try {
        const res = await axios.get(`${baseUrl}/calendar/${id}`, {
            withCredentials: true,
        });
        setCalendarData(res.data.data.days);
    
    } catch (error) {
        console.log(error);

    }
}
const sendEmail=async(email,name,subject,message)=>{
    setLoading(true);
    try{
        const res=await axios.post(`${baseUrl}/send-Email`,{email,name,subject,message},{
            withCredentials:true
        })

        setLoading(false);

    }catch(error){
        console.log(error);

    }
    setLoading(false);

}

    return (
        <Context.Provider value={{flag, allProperties, getProperties, loading,dates,selectedGuests,setDates,setSelectedGuests,getSinglePropertyDetails,property,getQuote,quote,createInquiry,getCalendarData,calendarData,sendEmail}}>
            {children}
        </Context.Provider>
    );
};

export const useLocalContext = () => useContext(Context);
export default ContextProvider;
