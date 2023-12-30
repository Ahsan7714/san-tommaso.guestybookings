import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { IoIosArrowRoundBack } from "react-icons/io";
const { RangePicker } = DatePicker;
import { Link, useParams } from "react-router-dom";
import { useLocalContext } from "../../context/contextProvider";

const BookingModel = ({ isSmallModalOpen, setIsSmallModalOpen }) => {
  const [dates, setDates] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState("");
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const {id}=useParams()
const {getQuote,property,quote,getCalendarData,calendarData}=useLocalContext()



const extractDisabledDates = (calendarData) => {
  const disabledDatesSet = [];
  for (const date in calendarData) {
    if (calendarData[date]?.status !== "available") {
      disabledDatesSet.push(calendarData[date]?.date);
    }
  }
  return disabledDatesSet;
};


React.useEffect(() => {
  getCalendarData(id);
}, [id]);

React.useEffect(() => {
  setDisabledDates(extractDisabledDates(calendarData));
}, [calendarData]);

  const handleDateChange = (values) => {
    console.log(values);
    // convert this value into the format that you want is YYYY-MM-DD
    const checkIn = moment(values[0].$d).format("YYYY-MM-DD");
    const checkOut = moment(values[1].$d).format("YYYY-MM-DD");
    setDates([checkIn,checkOut])
    };
    
    
  const handleGuestsChange = (e) => {
    setSelectedGuests(e.target.value);
    checkFormValidity(dates, e.target.value);
  };

  const checkFormValidity = (dates, guests) => {
    // Check if both dates and guests are selected
    const isValid = dates.length === 2 && guests !== "";
    setIsFormValid(isValid);
  };
const handleSearch = async () => {
  try {
    await getQuote(dates[0], dates[1], selectedGuests, property._id);


    // Continue with the next steps if no error
    setIsSmallModalOpen(false);
    setIsLargeModalOpen(true);
  } catch (error) {
    console.error("Error fetching quote:", error);
    alert("Error fetching quote. Please try again.");
    // Handle the error as needed
  }
};


  const options = [];
  for (let i = 1; i <= 5; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleBackArrowClick = () => {
    // Close the large modal and open the small modal
    setIsLargeModalOpen(false);
    setIsSmallModalOpen(true);
  };

  const closeModal = () => {
    // Close both modals
    setIsSmallModalOpen(false);
    setIsLargeModalOpen(false);

    // Also, close the main modal if needed
    setIsLargeModalOpen(false);
  };

  const isDateDisabled = (current) => {
    const formattedDate = moment(current).format("YYYY-MM-DD");
    return disabledDates.includes(formattedDate);
  };
  
  return (
    <div>
      {isSmallModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.67)] flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            {/* Your small modal content goes here */}
            <div className="flex flex-col justify-center items-center">
              <div style={{ margin: 20 }}>
                <RangePicker
                  className="h-[50px] lg:w-[400px] focus:border-blue-500"
                  required
                  onChange={(dates) => handleDateChange(dates)}
                  disabledDate={isDateDisabled}
                
                />
              </div>
              <div className="pb-5">
                <select
                  required
                  id="guests"
                  name="guests"
                  value={selectedGuests}
                  onChange={handleGuestsChange}
                  className="h-[50px] w-[300px] lg:w-[400px] text-[18px] px-5 text-[#00000091] outline-none focus:border-blue-500 border border-[#00000035]"
                >
                  <option value="" disabled hidden>
                    Guest
                  </option>
                  {options}
                </select>
              </div>
              <div>
                <button
                  className={`h-[50px] w-[300px] lg:w-[400px] ${
                    isFormValid ? "bg-[#9d155c]" : "bg-[#ccc]" // Use a different color for disabled state
                  } text-white`}
                  onClick={handleSearch}
                  disabled={!isFormValid}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLargeModalOpen && (
        <div className="fixed top-10 left-0 w-full h-full bg-[rgba(0,0,0,0.67)] flex items-center justify-center">
          <div className="bg-white p-10 w-[500px] rounded-md">
            {/* Your large modal content goes here */}
            <h1 className="text-[#10275b] text-[22px] font-semibold">
              {property?.title}
            </h1>
            <div className="flex justify-between py-10 text-center border-b border-[#00000050]">
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Check In</p>
                <p>{quote?.checkInDateLocalized}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Check Out</p>
                <p>{quote?.checkOutDateLocalized}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Days</p>
                <p>{
                  moment(quote?.checkOutDateLocalized).diff(moment(quote?.checkInDateLocalized), 'days')
                }</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Guest</p>
                <p>{quote?.guestsCount}</p>
              </div>
            </div>
            <div className="flex flex-col pt-8 pb-2">
              <div className="flex justify-between items-center pb-4 border-b border-[#00000050]">
                <h1 className="text-[18px] font-semibold">Subtotal</h1>
                <p>EUR ${quote?.rates?.ratePlans[0]?.ratePlan?.money?.subTotalPrice}</p>
              </div>
              <div className="flex justify-between items-center text-[#10275b] text-[22px] font-semibold py-6">
                <h1>Total</h1>
                <p>EUR ${quote?.rates?.ratePlans[0]?.ratePlan?.money?.subTotalPrice}</p>

              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <div className="" onClick={handleBackArrowClick}>
                <IoIosArrowRoundBack className="h-[45px] w-[90%] px-2 border border-[#9d155c] text-[#9d155c] cursor-pointer" />
              </div>
              <Link to="/booking-form" className="bg-[#9d155c] text-white h-[45px] w-[83%]" >
              <button className="bg-[#9d155c] text-white h-[45px] w-[83%]">
                Request to Book
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModel;
