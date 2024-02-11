import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
import { useLocalContext } from "../../context/contextProvider";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const { RangePicker } = DatePicker;

const DatePocker = ({ source }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook to access translation function
  const { dates, setDates, selectedGuests, setSelectedGuests, getProperties } = useLocalContext();

  const handleDateChange = (values) => {
    if (values) {
      const checkIn = moment(values[0]._d).format("YYYY-MM-DD"); // Updated to use _d for moment object
      const checkOut = moment(values[1]._d).format("YYYY-MM-DD"); // Updated to use _d for moment object
      setDates([checkIn, checkOut]);
    } else {
      setDates([null, null]);
    }
  };

  const handleGuestsChange = (e) => {
    setSelectedGuests(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getProperties(dates[0], dates[1], selectedGuests);
    setSelectedGuests("");
    setDates([null, null]);
    if (source === "Home") {
      navigate('/properties');
    }
  };

  const options = [];
  for (let i = 1; i <= 22; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div className="bg-white flex lg:flex-row md:flex-row items-center justify-between lg:gap-10 w-fit mx-auto rounded-md lg:px-6 px-1 flex-col">
      <div style={{ margin: 20 }}>
        <RangePicker
          className="h-[50px] lg:w-[550px] focus:border-blue-500 w-[300px]"
          onChange={(dates) => handleDateChange(dates)}
          // Updated start and end date labels with translations
          placeholder={[t('startDate'), t('endDate')]}
        />
      </div>
      <div className="flex gap-4 lg:flex-row md:flex-row flex-col">
        <div>
          <select
            id="guests"
            name="guests"
            value={selectedGuests}
            onChange={handleGuestsChange}
            className="h-[50px] w-full lg:w-[130px] text-[14px] pl-2 text-[#00000091] outline-none focus:border-blue-500 border border-[#00000035]"
          >
            <option value="" disabled hidden>{t('guests')}</option>
            {options}
          </select>
        </div>
        <div>
          <button
            className="h-[50px] w-[300px] lg:w-[130px] bg-[#9d155c] text-white mb-6 lg:mb-0"
            onClick={(e) => handleSearch(e)}
          >
            {t('search')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePocker;
