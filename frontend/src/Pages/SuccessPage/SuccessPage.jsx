import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import baseUrl from "../../context/baseUrl"
import Loader from "../../Components/Loader/Loader"
import { useEffect } from "react"

const SuccessPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const handleSuccess = async () => {
    const { data } = await axios.post(`${baseUrl}/confirm-payment`, {
      sessionId,
    });

    const { metadata, amount_total, payment_status } = data;
    const { checkInDate, checkOutDate, listingId, ratePlanId, guestsCount, guest,fareAccommodation} = metadata;

let guestDetails=     JSON.parse(guest);

    if (payment_status === "paid") {

        const response = await axios.post(`${baseUrl}/create-guest`, {
        ...guestDetails,
      });




        const reservationResponse = await axios.post(`${baseUrl}/create-reservation`, {
            checkInDateLocalized:checkInDate,
            checkOutDateLocalized: checkOutDate,
            listingId,
            ratePlanId,
            guestsCount,
            guestId: response.data._id,
            amount: fareAccommodation,
        });




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