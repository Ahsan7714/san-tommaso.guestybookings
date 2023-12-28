import React,{useState} from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import "./BookingForm.css"
import { Link } from "react-router-dom";
import about from "../../assets/about1.jpg"

const BookingForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };
  return (
    <div className="mt-24 flex lg:flex-row flex-col">
      <div className="lg:pl-20 px-5 pt-10">
        <h1 className="text-[#10275b] text-[33px] font-bold pb-2">
          Fill-in your details
        </h1>
        <p className="text-[#10275b] text-[20px] py-4">Guest information</p>
        <form action="" className="flex flex-col gap-10">
          <div className="flex lg:flex-row flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="" className="text-[#000000a8]">
                First name
              </label>
              <input
                type="text"
                required
                placeholder="Guest first name*"
                className="h-[44px] w-full lg:w-[280px] border rounded-sm border-[#0000004e] px-3 outline-none focus:border-blue-400 hover:border-blue-400 focus:shadow-lg focus:shadow-blue-100 transition-shadow duration-700"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="" className="text-[#000000a8]">
                Last name
              </label>
              <input
                type="text"
                required
                placeholder="Guest last name*"
                className="h-[44px] w-full lg:w-[280px] border rounded-sm border-[#0000004e] px-3 outline-none focus:border-blue-400 hover:border-blue-400 focus:shadow-lg focus:shadow-blue-100 transition-shadow duration-700"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-7">
            <div className="flex flex-col gap-4">
              <label htmlFor="" className="text-[#000000a8]">
                Email
              </label>
              <input
                type="text"
                required
                placeholder="email address*"
                className="h-[44px] w-full lg:w-[280px] border rounded-sm border-[#0000004e] px-3 outline-none focus:border-blue-400 hover:border-blue-400 focus:shadow-lg focus:shadow-blue-100 transition-shadow duration-700"
              />
            </div>
            <div className="flex flex-col gap-4">
               <span  className="text-[#000000a8]">Phone Number:</span> 
              <label>
                <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required: true,
            className:
              'h-[44px] w-full lg:w-[280px] border rounded-sm border-[#0000004e] pl-14 outline-none focus:border-blue-400 hover:border-blue-400 focus:shadow-lg focus:shadow-blue-100 transition-shadow duration-700',
          }}
        />
              </label>
              {!valid  && <p className="text-red-600 text-[14px]">Please enter a valid phone number*</p>}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
              <label htmlFor="" className="text-[#000000a8]">
              Add a special request
              </label>
              <textarea
                className=" w-full lg:w-[280px] border rounded-sm pt-3 border-[#0000004e] px-3 outline-none focus:border-blue-400 hover:border-blue-400 focus:shadow-lg focus:shadow-blue-100 transition-shadow duration-700"

               name="" id="" cols="30" rows="5" placeholder="Add a special request"></textarea>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex items-start ">
                    <input type="checkbox" name="" id="" className=" cursor-pointer h-[16px] w-10 mt-1"  />
                    <label className=" text-[16px]">I have read and accept the Privacy Policy | Agriturismo San Tommaso Terms and Conditions</label>
                </div>
                <div className="flex items-start ">
                    <input type="checkbox" name="" id="" className=" cursor-pointer h-[16px] w-10 mt-1"  />
                    <label className=" text-[16px]">I am interested in receiving discounts, promotions and news about Agriturismo San Tommaso</label>
                </div>
            </div>
        </form>
      </div>
      {/* card */}
      <div className="flex flex-col mt-7 lg:ml-5 mx-4">
        <div>
        <div className=" flex items-center justify-center">
          <div className="bg-[#e5e7eb] shadow-xl p-6 w-[500px] rounded-md">
            {/* Your large modal content goes here */}
        <div><img src={about} alt="" className="h-[200px] w-[500px] rounded-sm"/></div>
            <h1 className="text-[#10275b] text-[22px] font-semibold pt-4">
              Agriturismo San Tommaso - Leccio
            </h1>
            <div className="flex justify-between py-7 text-center border-b border-[#00000050]">
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Check In</p>
                <p>Jan 01, 2024</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Check Out</p>
                <p>Jan 08, 2024</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Nights</p>
                <p>7 nights</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#87919a] text-[17px]">Guest</p>
                <p>2</p>
              </div>
            </div>
            <div className="flex flex-col pt-8 pb-2">
              <div className="flex justify-between items-center pb-4 border-b border-[#00000050]">
                <h1 className="text-[18px] font-semibold">Subtotal</h1>
                <p>€1,400</p>
              </div>
              <div className="flex justify-between items-center text-[#10275b] text-[22px] font-semibold py-6">
                <h1>Total</h1>
                <p>€1,400</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ">
              <Link to="/thank-you" className="bg-[#9d155c] text-white h-[45px] w-[100%]" >
              <button className="bg-[#9d155c] text-white text-[20px] font-semibold h-[45px] w-[100%]">
                Request to Book
              </button>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
