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

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${day}`;
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDay = tomorrow.getDate();
    const nextMonth = tomorrow.getMonth() + 1;
    const nextYear = tomorrow.getFullYear();
    const nextDayDate = `${nextYear}-${nextMonth}-${nextDay}`;

    axios.defaults.withCredentials = true;
    const getProperties = async (checkIn = todayDate, checkOut = nextDayDate, count = 1) => {
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

    return (
        <Context.Provider value={{ allProperties, getProperties, loading,dates,selectedGuests,setDates,setSelectedGuests,getSinglePropertyDetails,property }}>
            {children}
        </Context.Provider>
    );
};

export const useLocalContext = () => useContext(Context);
export default ContextProvider;
