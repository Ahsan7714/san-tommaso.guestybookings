import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;

const DatePocker = () => {
  const [dates, setDates] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState('');

  const handleDateChange = (values) => {
    setDates(
      values.map((item) => {
        return moment(item).format("YYYY-DD-MM");
      })
    );
  };

  const handleGuestsChange = (e) => {
    setSelectedGuests(e.target.value);
  };

  const handleSearch = () => {
    // Perform actions with dates and selectedGuests
    console.log("Selected Dates:", dates);
    console.log("Selected Guests:", selectedGuests);
  };

  const options = [];
  for (let i = 1; i <= 22; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div className="bg-white flex lg:flex-row md:flex-row items-center justify-between  gap-10 w-fit mx-auto rounded-md   px-6 flex-col" >
      <div style={{ margin: 20 }}>
        <RangePicker
          className="h-[50px] lg:w-[550px] focus:border-blue-500"
          onChange={handleDateChange}
        />
      </div>
      <div className="flex gap-4 lg:flex-row md:flex-row flex-col">

     
      <div>
        <select
          id="guests"
          name="guests"
          value={selectedGuests}
          onChange={handleGuestsChange}
          className="h-[50px] w-[200px] lg:w-[130px] text-[18px] pl-2 text-[#00000091] outline-none focus:border-blue-500 border border-[#00000035]"
        >
          <option value="" disabled hidden>
            Guest
          </option>
          {options}
        </select>
      </div>
      <div>
        <button
          className="h-[50px] w-[300px] lg:w-[130px] bg-[#9d155c] text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      </div>
    </div>
  );
};

export default DatePocker;
