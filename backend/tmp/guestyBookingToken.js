const fs = require('fs');
const path = require('path');
const axios = require('axios');

const clientId = '0oaenhp8jzwl8VBDn5d7';
const clientSecret = 'aC6TTUA_Yn65UHk5VW3bhpc3XR-EOwSEVooR0RF_iO4zCB-OAixJjy0L2VKS1W8L';


const bookingConfigFilePath = path.join(__dirname, 'bookingConfig.json');

// Middleware to handle booking access token
const accessBookingToken = async (req, res, next) => {
  try {
    // Check if the booking token is already in the configuration file
    const { guestyBookingAccessToken, bookingExpirationTime } = getBookingConfig();

    if (guestyBookingAccessToken && bookingExpirationTime > Date.now()) {
      // Booking token is still valid, use it
      console.log('Using cached booking token:', guestyBookingAccessToken);
      req.guestyBookingAccessToken = guestyBookingAccessToken;
      next();
    } else {
      // Booking token has expired or not found, request a new one
      console.log('Cached booking token expired or not found, requesting a new one...');
      await requestNewBookingAccessToken(req, next);
    }
  } catch (error) {
    console.error('Error:', error.message);
    // Handle error as needed, e.g., send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to request a new booking access token
const requestNewBookingAccessToken = async (req, next) => {
  try {
    const response = await axios.post(
      'https://booking.guesty.com/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'booking_engine:api',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      }
    );

    const responseBody = response.data;

    // Save the new booking token to the booking configuration file
    saveBookingConfig({
      guestyBookingAccessToken: responseBody.access_token,
      bookingExpirationTime: Date.now() + responseBody.expires_in * 1000, // Convert seconds to milliseconds
    });

    console.log('New booking token obtained and saved:', responseBody.access_token);
    req.guestyBookingAccessToken = responseBody.access_token;

    next(); // Always call next to continue the middleware chain
  } catch (error) {
    console.error('Error getting booking access token:', error.message);
    // Handle error as needed
    throw error; // Propagate the error to the calling function
  }
};

// Helper function to read booking configuration from the file
function getBookingConfig() {
  try {
    const configData = fs.readFileSync(bookingConfigFilePath);
    return JSON.parse(configData);
  } catch (error) {
    // If the file doesn't exist or there's an error reading it, return an empty object
    return {};
  }
}

// Helper function to save booking configuration to the file
function saveBookingConfig(config) {
  const configData = JSON.stringify(config, null, 2);
  fs.writeFileSync(bookingConfigFilePath, configData);
}

module.exports = {
  accessBookingToken
};
