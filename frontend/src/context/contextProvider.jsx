import { useContext, useState } from "react";
import { Context } from "./Context";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useNavigate } from "react-router-dom";

const ContextProvider = ({ children }) => {
    const [dates, setDates] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState('');
    const [allProperties, setAllProperties] = useState([]);
    const [property, setProperty] = useState();
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState();
    const [calendarData, setCalendarData] = useState();



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


    const getQuote=async(checkInDate,checkOutDate,count,listingId)=>{
        try {
            const res = await axios.post(`${baseUrl}/listing/quote`,{checkInDate,checkOutDate,count,listingId}, {
                withCredentials: true,
            });
            if(res.data.error){
                alert(res.data.error)
                return Error(res.data.error.message)
            }else{

                setQuote(res.data);
            }
        } catch (error) {
            console.log(error);

        }

    }

const createInquiry=async(qouteId,firstName,lastName,email,phone,ratePlanId)=>{
    try {
        const res = await axios.post(`${baseUrl}/listing/quote/${qouteId}/inquiry`,{firstName,lastName,email,phone,ratePlanId}, {
            withCredentials: true,
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);

    }
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
    return (
        <Context.Provider value={{ allProperties, getProperties, loading,dates,selectedGuests,setDates,setSelectedGuests,getSinglePropertyDetails,property,getQuote,quote,createInquiry,getCalendarData,calendarData}}>
            {children}
        </Context.Provider>
    );
};

export const useLocalContext = () => useContext(Context);
export default ContextProvider;