const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Your Guesty API credentials
const clientId = '0oaecvddoeMoqmpPG5d7';
const clientSecret = 'URjPah64p2uRvgLGdyBUDAOEv55Vro8DLWkeH3iKCIldsojyGFiGP_s9vxDaU7tZ';

// Path to the configuration file
const configFilePath = path.join(__dirname, 'config.json');

// Middleware to handle access token
const accessTokenMiddleware = async (req, res, next) => {
  try {
    // Check if the token is already in the configuration file
    const { guestyAccessToken, expirationTime } = getConfig();

    if (guestyAccessToken && expirationTime > Date.now()) {
      // Token is still valid, use it
      console.log('Using cached token:', guestyAccessToken);
      req.guestyAccessToken = guestyAccessToken;
      next();
    } else {
      // Token has expired or not found, request a new one
      console.log('Cached token expired or not found, requesting a new one...');
      await requestNewAccessToken(req, next);
    }
  } catch (error) {
    console.error('Error:', error.message);
    // Handle error as needed, e.g., send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to request a new access token
const requestNewAccessToken = async (req, next) => {
  try {
    const response = await axios.post(
      'https://open-api.guesty.com/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'open-api',
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

    // Save the new token to the configuration file
    saveConfig({
      guestyAccessToken: responseBody.access_token,
      expirationTime: Date.now() + responseBody.expires_in * 1000, // Convert seconds to milliseconds
    });

    console.log('New token obtained and saved:', responseBody.access_token);
    req.guestyAccessToken = responseBody.access_token;

    next(); // Always call next to continue the middleware chain
  } catch (error) {
    console.error('Error getting access token:', error.message);
    // Handle error as needed
    throw error; // Propagate the error to the calling function
  }
};

// Helper function to read configuration from the file
function getConfig() {
  try {
    const configData = fs.readFileSync(configFilePath);
    return JSON.parse(configData);
  } catch (error) {
    // If the file doesn't exist or there's an error reading it, return an empty object
    return {};
  }
}

// Helper function to save configuration to the file
function saveConfig(config) {
  const configData = JSON.stringify(config, null, 2);
  fs.writeFileSync(configFilePath, configData);
}

module.exports = {
  accessTokenMiddleware,
};
