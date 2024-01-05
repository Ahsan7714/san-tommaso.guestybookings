import { addDays } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { useLocalContext } from '../../context/contextProvider';
import format from 'date-fns/format';
import { ToastContainer } from 'react-toastify';
import { MdOutlineClose } from 'react-icons/md';

const BookingModel = ({ isSmallModalOpen, setIsSmallModalOpen }) => {
  const [dates, setDates] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const { id } = useParams();
  const { getQuote, property, quote, getCalendarData, calendarData, flag } = useLocalContext();

  const extractDisabledDates = (calendarData) => {
    const disabledDatesSet = [];
    for (const date in calendarData) {
      if (calendarData[date]?.status !== 'available') {
        disabledDatesSet.push(calendarData[date]?.date);
      }
    }

    return disabledDatesSet;
  };

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);

    return () => {
      document.removeEventListener('keydown', hideOnEscape, true);
      document.removeEventListener('click', hideOnClickOutside, true);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    getCalendarData(id);
  }, [property]);

  useEffect(() => {
    setDisabledDates(extractDisabledDates(calendarData));
  }, [calendarData]);

  const handleDateChange = (values) => {
    const checkIn = moment(values[0].$d).format('YYYY-MM-DD');
    const checkOut = moment(values[1].$d).format('YYYY-MM-DD');
    setDates([checkIn, checkOut]);
  };

  const handleGuestsChange = (e) => {
    setSelectedGuests(e.target.value);
    checkFormValidity(dates, e.target.value);
  };

  const checkFormValidity = (dates, guests) => {
    const isValid = dates.length === 2 && guests !== '';
    setIsFormValid(isValid);
  };

  const isDateDisabled = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return disabledDates.includes(formattedDate);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const startDate = format(range[0].startDate, 'yyyy-MM-dd');
      const endDate = format(range[0].endDate, 'yyyy-MM-dd');

      if (!startDate || !endDate) {
        alert('Please select valid start and end dates.');
        return;
      }

      await getQuote(startDate, endDate, selectedGuests, property._id);

      if (quote?.error) {
        // alert(`Error: ${quote.error}`);
        setShowContactModal(true);
      } else {
        setIsLargeModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      alert('An error occurred while fetching the quote. Please try again.');
      setShowContactModal(true);
    }
  };

  useEffect(() => {
    if (flag) {
      setIsSmallModalOpen(false);
      setIsLargeModalOpen(true);
    }
  }, [flag, setIsSmallModalOpen, setIsLargeModalOpen, quote]);

  const options = [];
  for (let i = 1; i <= 25; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleBackArrowClick = () => {
    setIsLargeModalOpen(false);
    setIsSmallModalOpen(true);
  };


  
  

  return (
    <div>
      {isSmallModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.67)] flex flex-col items-center justify-center">
          <div className="calendarWrap z-50 absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div ref={refOne}>
              {open && (
                <div className='relative'>
                  <DateRangePicker
                    onChange={(item) => setRange([item.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction={window.innerWidth < 786 ? "vertical" : "horizantal"}
                    className="calendarElement "
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 365)}
                    disabledDates={disabledDates.map((date) => new Date(date))}
                    isDateBlocked={(date) => isDateDisabled(date)}
                    fixedHeight={true}
                  />
                  <div className="close absolute  right-2 top-0 " >
                    <MdOutlineClose className="text-2xl text-black cursor-pointer" onClick={() => setOpen(false)} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white p-8 rounded-md -z-10 relative">
            <div className="close absolute top-2 right-3 text-xl cursor-pointer" onClick={() => setIsSmallModalOpen(false)}>
              <MdOutlineClose />
            </div>
            <div className="flex flex-col justify-center items-center">
              <input
                value={`${format(range[0].startDate, 'MM/dd/yyyy')} to ${format(range[0].endDate, 'MM/dd/yyyy')}`}
                readOnly
                className="inputBox border text-center  py-7  h-[50px] w-full lg:w-[400px] text-[18px] px-5 text-[#00000091] outline-none focus:border-blue-500 my-5 border-[#00000035]"
                onClick={() => setOpen((open) => !open)}
              />
              <div className="pb-5">
                <select
                  required
                  id="guests"
                  name="guests"
                  value={selectedGuests}
                  onChange={handleGuestsChange}
                  className="h-[50px] w-[250px] lg:w-[400px] text-[18px] px-5 text-[#00000091] outline-none focus:border-blue-500 border border-[#00000035]"
                >
                  <option value="" disabled hidden>
                    Guest
                  </option>
                  {options}
                </select>
              </div>
              <div>
                <button
                  className='h-[50px] w-[250px] lg:w-[400px] bg-[#9d155c] text-white text-[18px] '
                  onClick={(e) => handleSearch(e)}
                >
                  Search
                </button>
              </div>
              {showContactModal && (
               <Link to='/contact-us' className='text-[blue] mt-5 text-[20px]'>
              Click to Contact us
               </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {isLargeModalOpen && (
        <div className="fixed top-10 left-0 w-full h-full px-3 lg:px-0 bg-[rgba(0,0,0,0.67)] flex items-center justify-center">
          <div className="bg-white p-10 w-[500px] rounded-md">
            <h1 className="text-[#10275b] text-[22px] font-semibold">{property?.title}</h1>
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
                <p>{moment(quote?.checkOutDateLocalized).diff(moment(quote?.checkInDateLocalized), 'days')}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Guest</p>
                <p>{quote?.guestsCount}</p>
              </div>
            </div>
            <div className="flex flex-col pt-8 pb-2">
              <div className="flex justify-between items-center pb-4 border-b border-[#00000050]">
                <h1 className="text-[18px] font-semibold">Subtotal</h1>
                <p>EUR {quote?.rates?.ratePlans[0]?.ratePlan?.money?.subTotalPrice}</p>
              </div>
              <div className="flex justify-between items-center text-[#10275b] text-[22px] font-semibold py-6">
                <h1>Total</h1>
                <p>EUR {quote?.rates?.ratePlans[0]?.ratePlan?.money?.subTotalPrice}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <div className="" onClick={handleBackArrowClick}>
                <IoIosArrowRoundBack className="h-[45px] w-[90%] px-2 border border-[#9d155c] text-[#9d155c] cursor-pointer" />
              </div>
              <Link to="/booking-form" className="bg-[#9d155c] text-white h-[45px] w-[83%]">
                <button className="bg-[#9d155c] text-white h-[45px] w-[83%]">Request to Book</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookingModel;
