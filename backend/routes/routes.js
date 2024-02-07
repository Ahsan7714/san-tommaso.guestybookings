const express = require('express');
const sendEmail = require('../tmp/sendEmail');
const router = express.Router();
const moment = require('moment');
const {accessBookingToken} = require('../tmp/guestyBookingToken');
const { accessTokenMiddleware} = require('../tmp/guestyOpenApiToken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
// router.get('/listings', generateGuestyOpenApiToken);
router.get('/listings',accessBookingToken, async (req, res) => {
  const { checkIn, checkOut, count } = req.query;

  const queryObj = {};

  if (checkIn) {
      queryObj.checkIn = checkIn;
  }
  if (checkOut) {
      queryObj.checkOut = checkOut;
  }
  if (count) {
      queryObj.minOccupancy = count;
  }

  console.log(queryObj);
  console.log(req.guestyOpenApiToken);

  try {
      const queryParams = new URLSearchParams(queryObj);  // Use URLSearchParams to build query string

      const response = await fetch(`https://booking.guesty.com/api/listings?limit=100&${queryParams}`, {
          headers: {
              "accept": 'application/json',
              "authorization": `Bearer ${req.guestyBookingAccessToken}`,
          },
      });

      const data = await response.json();

      res.status(200).json(data);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ "error": error.message });
  }
});

module.exports = router;


// Get the single listing
router.get('/listing/:id', accessTokenMiddleware,async(req, res) => {
    console.log(req.guestyAccessToken)
try {
    const response = await fetch(`https://open-api.guesty.com/v1/listings/${req.params.id}`, {
        headers: {
            "accept": 'application/json',
            "authorization": `Bearer ${req.guestyAccessToken}`,
        }
    });
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return res.status(500).json({ "error": error.message });
    }
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ "error": error.message });
  }
})





router.post("/send-email",async(req,res)=>{
    const {name,email,subject,message}=req.body
    await sendEmail({
        email: email,
        subject:subject,
        message:`
        Thanks for contacting us. Here is a copy of your message: \n\n
        email: ${email} \n
        name:${name} \n
        message:${message} \n
        We will get back to you as soon as possible.
        `,
      });
        res.status(200).json({success:true,message:"Email send successfully"})
})


router.post("/listing/quote",accessBookingToken,async(req,res)=>{
    const {count,checkInDate,checkOutDate,listingId}=req.body
console.log({message : count})

    try {
        const response = await fetch(`https://booking.guesty.com/api/reservations/quotes`, {
            headers: {
                "accept": 'application/json',
                'content-type': 'application/json',
                "authorization": `Bearer ${req.guestyBookingAccessToken}`,
            },
            method:"POST",
             body:JSON.stringify({
                guestsCount: count,
                checkInDateLocalized: checkInDate,
                checkOutDateLocalized: checkOutDate,
                listingId: listingId
             })
        });

        const data = await response.json();

      
        
        res.status(200).json(data);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ "error": error.message });
      }
})



router.get("/listing/quote/:id",accessBookingToken,async(req,res)=>{

const quoteId=req.params.id
    try {
        const response = await fetch(`https://booking.guesty.com/api/reservations/quotes/${quoteId}`, {
            headers: {
                "accept": 'application/json',
                'content-type': 'application/json',
                "authorization": `Bearer ${req.guestyBookingAccessToken}`,
            },
             
        });

        const data = await response.json();
        console.log(data);
        
        res.status(200).json(data);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ "error": error.message });
      }
})

router.post("/listing/quote/:id/inquiry",accessBookingToken,async(req,res)=>{
    const quoteId=req.params.id
    const {firstName,lastName,email,phone,ratePlanId}=req.body
        try {
            const response = await fetch(`https://booking.guesty.com/api/reservations/quotes/${quoteId}/inquiry`, {
                headers: {
                    "accept": 'application/json',
                    'content-type': 'application/json',
                    "authorization": `Bearer ${req.guestyBookingAccessToken}`,
                },
                method:'POST',
                body: JSON.stringify({
                    guest: {
                      firstName: firstName,
                      lastName: lastName,
                      email:email,
                      phone: phone
                    },
                    reservedUntil: -1,
                    ratePlanId: ratePlanId
                  })
                 
            });
    
            const data = await response.json();
            console.log(data);
            
            res.status(200).json(data);
          } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ "error": error.message });
          }
    })
    // router.get("/calendar/:id",generateGuestyOpenApiToken)
    router.get("/calendar/:id",accessTokenMiddleware,async(req,res)=>{
        console.log(req.guestyOpenApiToken);
        const listingId=req.params.id
        // get todays date in the format YYYY-MM-DD
        const today = moment().format("YYYY-MM-DD");
        // get the date 3 year from now in the format YYYY-MM-DD
        const threeYearsFromNow = moment().add(3, "years").format("YYYY-MM-DD");
            try {
                const response = await fetch(`https://open-api.guesty.com/v1/availability-pricing/api/calendar/listings/${listingId}?startDate=${today}&endDate=${threeYearsFromNow}`, {
                    headers: {
                        "accept": 'application/json',
                        'content-type': 'application/json',
                        "authorization": `Bearer ${req.guestyAccessToken}`,
                    },
                     
                });
        
                const data = await response.json();
                
                res.status(200).json(data);
              } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ "error": error.message });
              }
        })

        router.post("/booking", async (req, res) => {
          try {
            // Extract necessary data from the request body
            const { checkInDate, checkOutDate, listingId, ratePlanId, price ,guestsCount,
                guest,qouteId
            } = req.body;
     

            
            // Create a Stripe Checkout session
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                {
                  price_data: {
                    currency: 'eur',
                    product_data: {
                      name: 'Booking at Santommaso Agriturismo',
                        images: ['https://www.santommaso.com/wp-content/uploads/2021/03/logo2021.png'],


                    },
                    unit_amount: price * 100,
                  },
                  quantity: 1,
                  
                },
                
              ],
              metadata: {
                checkInDate,
                checkOutDate,
                listingId,
                ratePlanId,
                guest,
                guestsCount,
                qouteId
              },
              mode: 'payment',
              success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
              cancel_url: `${process.env.CLIENT_URL}/`,
            });
        console.log(session)

            // Send the session ID as a response
            res.json({ url: session.url });
          } catch (error) {
            console.error("Error creating Stripe Checkout session:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
          }
        });

        // confirm the payment
        router.post("/confirm-payment",async(req,res)=>{
          const {sessionId}=req.body
          try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            console.log(session)
            res.status(200).json(session);
          } catch (error) {
            console.error("Error confirming payment:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
          }
        })
        

        // create a route for creating the guest 
        
        router.post("/create-guest",accessTokenMiddleware, async (req, res) => {
            const { firstName, lastName, email, phone } = req.body;
            try {
              const response = await axios.post("https://open-api.guesty.com/v1/guests-crud", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
              }, {
                headers: {
                  "accept": 'application/json',
                  'content-type': 'application/json',
                  "authorization": `Bearer ${req.guestyAccessToken}`,
                },
              });
          
              const data = response.data;
              console.log(data);
          
              res.status(200).json(data);
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ "error": error.message });
            }
          });



          router.post("/create-reservation", accessBookingToken, async (req, res) => {
            const { checkInDateLocalized, checkOutDateLocalized, listingId, ratePlanId, guestId, guest, amount, qouteId } = req.body;
            try {
                const response = await axios.post(`https://booking.guesty.com/api/reservations/quotes/${qouteId}/instant`, {
                    checkInDateLocalized: checkInDateLocalized,
                    checkOutDateLocalized: checkOutDateLocalized,
                    listingId: listingId,
                    ratePlanId: ratePlanId,
                    guestId: guestId,
                    status: "confirmed",
                    guest,
                    qouteId,
                    money: {
                        fareAccommodation: amount,
                        currency: "EUR",
                    },
                    ccToken: "pm_1J3z3vGy3b4zSj5Gz3z3vGy3",
                }, {
                  headers: {
                    "accept": 'application/json',
                    'content-type': 'application/json',
                    "authorization": `Bearer ${req.guestyBookingAccessToken}`,
                },
                });
        
                const data = response.data;
                console.log(data);
        
                res.status(200).json(data);
            } catch (error) {
                console.error('Error:', error);
                // Handle specific error cases if needed
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Server responded with:', error.response.data.error.data.errors);
                    console.error('Status code:', error.response.status);
                    res.status(error.response.status).json({ error: error.response.data });
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    res.status(500).json({ error: 'No response received from the server' });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Request setup error:', error.message);
                    res.status(500).json({ error: 'Error setting up the request' });
                }
            }
        });
        

              // add the payment to reservation

              https://open-api.guesty.com/v1/reservations/{id}/payments

                router.post("/add-payment-to-reservation",accessTokenMiddleware, async (req, res) => {
                    const { reservationId, amount, currency } = req.body;
                    try {
                      const response = await axios.post(`https://open-api.guesty.com/v1/reservations/${reservationId}/payments`, {
                        amount: amount,
                        paymentMethod:{
                            method:"STRIPE",
                            saveForFutureUse:true,
                            id:"58a1930e85e33bd55ec5c8c3"
                        },

                      }, {
                        headers: {
                          "accept": 'application/json',
                          'content-type': 'application/json',
                          "authorization": `Bearer ${req.guestyAccessToken}`,
                        },
                      });
                  
                      const data = response.data;
                      console.log(data);
                  
                      res.status(200).json(data);
                    } catch (error) {
                      console.error('Error:', error);
                      res.status(500).json({ "error": error.message });
                    }
                  })

module.exports = router;




