import React,{useState} from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import "./BookingForm.css"
import { Link, useNavigate } from "react-router-dom";
import about from "../../assets/about1.jpg"
import { useLocalContext } from "../../context/contextProvider";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../../context/baseUrl";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51OFkbpAd2NZzaFPbmwdrBMgl3pgyC2m0m5kpt0cqx6rdcMEHQ6wQkNIABrpRqOvefxYVrE7m59yHTYNY1HpVDHrB005zGu8TBd');



const BookingForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [acceptedPaymentTerms, setAcceptedPaymentTerms] = useState(false);

  const { quote, property } = useLocalContext();
  const navigate = useNavigate();
  const { createInquiry } = useLocalContext();

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  

  const handleBook = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !acceptedPolicy || !acceptedPaymentTerms) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      const guest=JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber
      })

      // Make a request to your server to create a Stripe Checkout session
      const response = await axios.post(`${baseUrl}/booking`, {
      price: quote.rates.ratePlans[0].ratePlan.money.hostPayout,
      checkInDate: quote?.checkInDateLocalized,
      checkOutDate: quote?.checkOutDateLocalized,
      guestsCount: quote.guestsCount,
      guest,
      listingId: property._id,
      fareAccommodation: quote.rates.ratePlans[0].ratePlan.money.fareAccommodation,
      ratePlanId: quote.rates.ratePlans[0].ratePlan._id,
      qouteId: quote?._id,
      });
  
      // Extract the session ID from the response
      const url = response.data.url;
  
      // Redirect the user to the Stripe Checkout page
      window.location.href = url;
    } catch (error) {
      console.error("Error creating Stripe Checkout session:", error);
      // Handle the error, show an error message, or redirect the user to an error page
    }
  };
  

  return (
    <form className="lg:mt-10 mt-14 mb-20 flex justify-between px-5 lg:flex-row flex-col">
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
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}

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
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
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
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

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
                className=" w-full  border rounded-sm pt-3 border-[#0000004e] px-3 outline-none focus:border-blue-400 hover:border-blue-400 focus:shadow-lg focus:shadow-blue-100 transition-shadow duration-700"

               name="" id="" cols="40" rows="5" placeholder="Add a special request"></textarea>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex items-start ">
                    <input type="checkbox" name="" onChange={() => setAcceptedPolicy(!acceptedPolicy)} id="" className=" cursor-pointer h-[16px] w-10 mt-1"  />
                    <label className=" text-[16px]">I have read & accept the Privacy Policy | Agriturismo San Tommaso Terms and Conditions</label>
                </div>
                <div className="flex items-start ">
                    <input type="checkbox" name=""  onChange={() => setAcceptedPaymentTerms(!acceptedPaymentTerms)} id="" className=" cursor-pointer h-[16px] w-10 mt-1"  />
                    <label className=" text-[16px]">I have read & accept the payment terms & rental conditions | Agriturismo San Tommaso Terms and Conditions</label>
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
        <div><img src={"./images/IMG_4153.jpg"}alt="" className="h-[250px] w-[500px] rounded-sm object-cover"/></div>
        <div className="bg-white p-10 w-[full] rounded-md">
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
                <p className="text-[#87919a] text-[17px]">Guests</p>
                <p>{quote?.guestsCount}</p>
              </div>
            </div>
            <div className="flex flex-col pt-8 pb-2">
            <div className="flex justify-between items-center pb-4 ">
                <h1 className="text-[18px] font-semibold">per night</h1>
                <p>€ {quote?.rates?.ratePlans[0]?.days[0]?.price}</p>
              </div>
              <div className="flex justify-between items-center pb-2 ">
                <h1 className="text-[18px] font-semibold">Subtotal</h1>
                <p>€ {quote?.rates?.ratePlans[0]?.days[0]?.price*moment(quote?.checkOutDateLocalized).diff(moment(quote?.checkInDateLocalized), 'days')}</p>
              </div>
              {
                quote?.promotions && (
                  <div className="flex justify-between items-center pb-2 border-b border-[#00000050]">
                <h1 className="text-[18px] font-semibold">Discount </h1>
                <p> {"  € "}{quote?.rates?.ratePlans[0]?.ratePlan?.money?.invoiceItems[1]?.amount }</p>
              </div>
                )
              }
              <div className="flex justify-between items-center text-[#10275b] text-[22px] font-semibold py-6">
                <h1>Total</h1>
                <p className='flex gap-3 items-center'>
                <span className='line-through text-xl    '>€ {quote?.rates?.ratePlans[0]?.ratePlan?.money?.fareAccommodation}</span>
                € {quote?.rates?.ratePlans[0]?.ratePlan?.money?.hostPayout}</p>
              </div>
            </div>
          </div>            <div className="flex items-center gap-3 ">
            {
              acceptedPolicy && acceptedPaymentTerms ? (
                <button onClick={()=>handleBook()}  type="button"  className="bg-[#9d155c] text-white h-[45px] w-[100%] font-poppins" >
              <button type="button"  className="bg-[#9d155c] text-white text-[20px] font-semibold h-[45px] w-[100%]">
                 Book
              </button>
              </button>):
              <button onClick={()=>handleBook()} type="button" disabled className="bg-[#e4549e] text-white h-[45px] w-[100%] font-poppins" >
              <button  type="button" disabled={true} className="bg-[#e24f9b] cursor-not-allowed text-white text-[20px] font-semibold h-[45px] w-[100%] font-poppins">
                 Book
              </button>
              </button>

              
            }
            </div>
          </div>
        </div>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;



// {
//   "promotions": {
//       "_id": "65757446baed60886252bc53",
//       "name": "D4day discount 29-03",
//       "type": "los_direct_bookings",
//       "rule": {
//           "discountType": "percent",
//           "discountAmount": 10
//       }
//   },
//   "coupons": [],
//   "rates": {
//       "ratePlans": [
//           {
//               "ratePlan": {
//                   "_id": "default-rateplan-id",
//                   "name": "Standard",
//                   "priceAdjustment": {
//                       "type": "flat",
//                       "direction": "decrease",
//                       "amount": 0
//                   },
//                   "type": "default",
//                   "mealPlans": [],
//                   "cancellationPolicy": null,
//                   "cancellationFee": null,
//                   "description": "",
//                   "minNights": 0,
//                   "rateStrategies": [],
//                   "money": {
//                       "_id": "65c2580516eab4000ede8fec",
//                       "currency": "EUR",
//                       "fareAccommodation": 540,
//                       "fareAccommodationAdjusted": 486,
//                       "fareCleaning": 0,
//                       "totalFees": 0,
//                       "subTotalPrice": 486,
//                       "hostPayout": 486,
//                       "hostPayoutUsd": 522.21,
//                       "totalTaxes": 0,
//                       "invoiceItems": [
//                           {
//                               "title": "Accommodation fare",
//                               "amount": 540,
//                               "currency": "EUR",
//                               "type": "ACCOMMODATION_FARE",
//                               "normalType": "AF"
//                           },
//                           {
//                               "title": "D4day discount 29-03",
//                               "amount": -54,
//                               "currency": "EUR",
//                               "type": "PROMOTION",
//                               "description": "D4day discount 29-03",
//                               "normalType": "PRO",
//                               "partOf": "AF"
//                           }
//                       ]
//                   }
//               },
//               "days": [
//                   {
//                       "date": "2024-04-14",
//                       "currency": "EUR",
//                       "rateStrategy": 0,
//                       "ratePlan": 0,
//                       "minNights": 3,
//                       "maxNights": 30,
//                       "manualPrice": 135,
//                       "lengthOfStay": 0,
//                       "price": 135
//                   },
//                   {
//                       "date": "2024-04-15",
//                       "currency": "EUR",
//                       "rateStrategy": 0,
//                       "ratePlan": 0,
//                       "minNights": 3,
//                       "maxNights": 30,
//                       "manualPrice": 135,
//                       "lengthOfStay": 0,
//                       "price": 135
//                   },
//                   {
//                       "date": "2024-04-16",
//                       "currency": "EUR",
//                       "rateStrategy": 0,
//                       "ratePlan": 0,
//                       "minNights": 3,
//                       "maxNights": 30,
//                       "manualPrice": 135,
//                       "lengthOfStay": 0,
//                       "price": 135
//                   },
//                   {
//                       "date": "2024-04-17",
//                       "currency": "EUR",
//                       "rateStrategy": 0,
//                       "ratePlan": 0,
//                       "minNights": 3,
//                       "maxNights": 30,
//                       "manualPrice": 135,
//                       "lengthOfStay": 0,
//                       "price": 135
//                   }
//               ]
//           }
//       ]
//   },
//   "checkOutDateLocalized": "2024-04-18",
//   "checkInDateLocalized": "2024-04-14",
//   "unitTypeId": "65742b62b74f5a0012c81970",
//   "source": "BE-API",
//   "channel": "booking_engine",
//   "guestsCount": 1,
//   "accountId": "6570dc3898dc495759a57d14",
//   "expiresAt": "2024-02-07T16:02:13.082Z",
//   "createdAt": "2024-02-06T16:02:13.082Z",
//   "_id": "65c25804d4a6c25dc51ae318",
//   "__v": 0,
//   "status": "valid"
// }