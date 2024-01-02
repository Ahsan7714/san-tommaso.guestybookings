const https = require('https');
const querystring = require('querystring');

const generateGuestyBookingToken = async (req, res, next) => {
  try {
    const options = {
      method: 'POST',
      hostname: 'booking.guesty.com',
      path: '/oauth2/token',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
    };

    const postData = querystring.stringify({
      'grant_type': 'client_credentials',
      'scope': 'booking_engine:api',
      'client_secret': process.env.GUESTY_BOOKING_CLIENT_SECRET, // Replace with your actual client secret
      'client_id': process.env.GUESTY_BOOKING_CLIENT_ID, 
    });

    options.headers['Content-Length'] = postData.length;

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const responseData = JSON.parse(data);

        if (!responseData.access_token) {
          throw new Error('Failed to obtain Guesty API token');
        }

        req.guestyBookingToken = responseData.access_token;
        next();
      });
    });

    request.on('error', (error) => {
      console.error('Error generating Guesty API token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    request.write(postData);
    request.end();
  } catch (error) {
    console.error('Error generating Guesty API token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = generateGuestyBookingToken;
