import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import baseUrl from "../../context/baseUrl"
import Loader from "../../Components/Loader/Loader"
import { useEffect } from "react"
import { toast } from "react-toastify"

const SuccessPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const handleSuccess = async () => {
    const { data } = await axios.post(`${baseUrl}/confirm-payment`, {
      sessionId,
    });

    const { metadata, amount_total, payment_status } = data;
    const { checkInDate, checkOutDate, listingId, ratePlanId, guestsCount, guest,fareAccommodation,qouteId} = metadata;
    alert(qouteId)

let guestDetails=     JSON.parse(guest);

    if (payment_status === "paid") {

        const response = await axios.post(`${baseUrl}/create-guest`, {
        ...guestDetails,
      });

      console.log(response.data);



        const reservationResponse = await axios.post(`${baseUrl}/create-reservation`, {
            checkInDateLocalized:checkInDate,
            checkOutDateLocalized: checkOutDate,
            listingId,
            ratePlanId,
            guestsCount,
            guest:JSON.parse(guest),
            qouteId,
            guestId: response.data._id,
            amount: fareAccommodation,
        });


        // add payment to reservation

        const paymentResponse = await axios.post(`${baseUrl}/add-payment-to-reservation`, {
            reservationId: reservationResponse?.data?._id,
            amount: amount_total,
            sessionId,
        });

        console.log(paymentResponse.data);

        toast.success("Payment Successful, Reservation Created");
        // navigate("/");



    }
  };

  useEffect(() => {
    handleSuccess();
  }, []);

  return (
    <>
      <Loader />
    </>
  );
};

export default SuccessPage;


