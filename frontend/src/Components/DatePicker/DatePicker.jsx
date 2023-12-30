import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
import { useLocalContext } from "../../context/contextProvider";
import { useNavigate } from "react-router-dom";


const { RangePicker } = DatePicker;

const DatePocker = ({source}) => {
  const navigate=useNavigate();
const {dates,setDates,selectedGuests,setSelectedGuests,getProperties}=useLocalContext()

const handleDateChange = (values) => {
console.log(values);
// convert this value into the format that you want is YYYY-MM-DD
const checkIn = moment(values[0].$d).format("YYYY-MM-DD");
const checkOut = moment(values[1].$d).format("YYYY-MM-DD");
setDates([checkIn,checkOut])
};


  const handleGuestsChange = (e) => {
    setSelectedGuests(e.target.value);
  };

  const handleSearch = (e) => {
    if(source=="Home"){
      navigate('/properties')
    }
    e.preventDefault();
    
    getProperties(dates[0],dates[1],selectedGuests)
    
  };

  const options = [];
  for (let i = 1; i <= 22; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div className="bg-white flex lg:flex-row md:flex-row items-center justify-between  lg:gap-10 w-fit mx-auto rounded-md lg:px-6   px-1 flex-col" >
      <div style={{ margin: 20 }}>
      <RangePicker
  className="h-[50px] lg:w-[550px] focus:border-blue-500 w-[300px]"
  onChange={(dates) => handleDateChange(dates)}
/>
      </div>
      <div className="flex gap-4 lg:flex-row md:flex-row flex-col">

     
      <div>
        <select
          id="guests"
          name="guests"
          value={selectedGuests}
          onChange={handleGuestsChange}
          className="h-[50px] w-full lg:w-[130px] text-[18px] pl-2 text-[#00000091] outline-none focus:border-blue-500 border border-[#00000035]"
        >
          <option value="" disabled hidden >
            Guest
          </option>
          {options}
        </select>
      </div>
      <div>
        <button
          className="h-[50px] w-[300px] lg:w-[130px] bg-[#9d155c] text-white mb-6 lg:mb-0"
          onClick={(e)=>handleSearch(e)}

        >
          Search
        </button>
      </div>
      </div>
    </div>
  );
};

export default DatePocker;
