const https = require('https');
const querystring = require('querystring');
let token = null;
const generateGuestyOpenApiToken = async (req, res, next) => {
  try {
    // Assuming you have a function to check if the token is expired
    const isTokenExpired = (token) => {
      return token.error && token.error.code === 'UNAUTHORIZED';
    };

    // Check if the token is present and not expired
    if (token && !isTokenExpired(token)) {
      console.log("Guesty Open API Token is not expired. Reusing existing token.");
      req.guestyOpenApiToken = token;
      next();
      return;
    }

    console.log("Guesty Open API Token is expired or not present. Generating a new one.");

    const postData = querystring.stringify({
      'grant_type': 'client_credentials',
      'scope': 'open-api',
      'client_secret': 'o-AQ0Jmn9nUUgk8IYUnNVrP7LgTBpFB6A9k2eWaKGwbACK_U4l7ISIw1Okk-ebne', // Replace with your actual client secret
      'client_id': '0oae4zuh0mzZ7f0cM5d7', // Replace with your actual client ID
    });

    const options = {
      method: 'POST',
      hostname: 'open-api.guesty.com',
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
        console.log("Guesty Open API Response:", resToken.statusCode, resToken.headers, data);

        const tokenData = JSON.parse(data);

        if (!tokenData.access_token) {
          console.error('Failed to obtain Guesty Open API token');
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        token =req.guestyOpenApiToken=  tokenData.access_token;
        console.log("New Guesty Open API token generated:", req.guestyOpenApiToken);

        // Save the expiration timestamp of the token (optional)
        req.guestyOpenApiTokenExpiry = Date.now() + (tokenData.expires_in * 1000);

        next();
      });
    });

    reqToken.on('error', (error) => {
      console.error('Error generating Guesty Open API token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    reqToken.write(postData);
    reqToken.end();
  } catch (error) {
    console.error('Error generating Guesty Open API token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports={
  token,
  generateGuestyOpenApiToken
}