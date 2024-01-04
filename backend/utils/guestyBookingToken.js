const https = require('https');
const querystring = require('querystring');

let bookingToken = null;

const generateGuestyBookingToken = async (req, res, next) => {
  try {
    // Assuming you have a function to check if the token is expired
    const isTokenExpired = (token) => {
      return token && token.error && token.error.code === 'UNAUTHORIZED';
    };

    // Check if the token is present and not expired
    if (bookingToken && !isTokenExpired(bookingToken)) {
      console.log("Booking Token is not expired. Reusing existing token.");
      req.guestyBookingToken = bookingToken;
      next();
      return;
    }

    console.log("Booking Token is expired or not present. Generating a new one.");

    const postData = querystring.stringify({
      'grant_type': 'client_credentials',
      'scope': 'booking_engine:api',
      'client_secret': 'qgo7w4a0Qvt1Y5pZb4OckPsjiVVmIRudNLdr5WrUuPqtpaCZbObHDP_4ej483Dho', // Replace with your actual client secret
      'client_id': '0oae6de2qxLp2Y3x85d7', // Replace with your actual client ID
    });

    const options = {
      method: 'POST',
      hostname: 'booking.guesty.com',
      path: '/oauth2/token',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const reqToken = https.request(options, (resToken) => {
      let data = '';

      resToken.on('data', (chunk) => {
        data += chunk;
      });

      resToken.on('end', () => {
        const tokenData = JSON.parse(data);

        if (!tokenData.access_token) {
          console.error('Failed to obtain Guesty API token');
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        bookingToken = req.guestyBookingToken = tokenData.access_token;
        console.log("New Booking Token generated:", req.guestyBookingToken);
        next();
      });
    });

    reqToken.on('error', (error) => {
      console.error('Error generating Guesty API token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    reqToken.write(postData);
    reqToken.end();
  } catch (error) {
    console.error('Error generating Guesty API token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports={
    generateGuestyBookingToken,
    bookingToken
}