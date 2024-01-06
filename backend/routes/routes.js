const express = require('express');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();
const moment = require('moment');
const {accessBookingToken} = require('../utils/guestyBookingToken');
const { accessTokenMiddleware} = require('../utils/guestyOpenApiToken');

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
              "authorization": `Bearer ${req.guestyBookingToken}`,
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
try {
    const response = await fetch(`https://open-api.guesty.com/v1/listings/${req.params.id}`, {
        headers: {
            "accept": 'application/json',
            "authorization": `Bearer ${req.guestyAccessToken}`,
        }
    });

    // Ensure the fetch request is successful
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
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


    try {
        const response = await fetch(`https://booking.guesty.com/api/reservations/quotes`, {
            headers: {
                "accept": 'application/json',
                'content-type': 'application/json',
                "authorization": `Bearer ${req.guestyBookingToken}`,
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
                "authorization": `Bearer ${req.guestyBookingToken}`,
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
                    "authorization": `Bearer ${req.guestyBookingToken}`,
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


module.exports = router;