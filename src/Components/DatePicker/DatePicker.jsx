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
    <div className="flex lg:flex-row flex-col lg:h-[100px] lg:w-[100%] lg:ml-24 bg-white shadow-lg rounded-lg justify-center items-center gap-3 lg:gap-7 mb-10 pt-3 lg:pt-0 pb-6 lg:pb-0">
      <div style={{ margin: 20 }}>
        <RangePicker
          className="h-[50px] lg:w-[550px] focus:border-blue-500"
          onChange={handleDateChange}
        />
      </div>
      <div>
        <select
          id="guests"
          name="guests"
          value={selectedGuests}
          onChange={handleGuestsChange}
          className="h-[50px] w-[300px] lg:w-[150px] text-[18px] px-5 text-[#00000091] outline-none focus:border-blue-500 border border-[#00000035]"
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
  );
};

export default DatePocker;
