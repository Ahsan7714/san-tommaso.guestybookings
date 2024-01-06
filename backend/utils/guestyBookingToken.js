const https = require('https');
const querystring = require('querystring');
const NodeCache = require('node-cache');
const request = require('request');
const express = require('express');

const app = express();
const clientId = '0oae6de2qxLp2Y3x85d7';
const clientSecret = 'qgo7w4a0Qvt1Y5pZb4OckPsjiVVmIRudNLdr5WrUuPqtpaCZbObHDP_4ej483Dho';


const bookingTokenCache = new NodeCache();

// Middleware to handle booking access token
const accessBookingToken = (req, res, next) => {
  // Check if the booking token is already in the cache
  const cachedBookingToken = bookingTokenCache.get('guestyBookingAccessToken');

  if (cachedBookingToken) {
    // Booking token is in the cache, check if it's expired
    const bookingExpirationTime = bookingTokenCache.getTtl('guestyBookingAccessToken');
    const currentTime = Math.floor(Date.now() / 1000);

    if (bookingExpirationTime > currentTime) {
      // Booking token is still valid, use it
      console.log('Using cached booking token:', cachedBookingToken);
      req.guestyBookingToken = cachedBookingToken;
      next();
    } else {
      // Booking token has expired, request a new one
      console.log('Cached booking token expired, requesting a new one...');
      requestNewBookingAccessToken(req, next);
    }
  } else {
    // Booking token is not in the cache, request a new one
    console.log('No cached booking token found, requesting a new one...');
    requestNewBookingAccessToken(req, next);
  }
};

// Function to request a new booking access token
const requestNewBookingAccessToken = (req, next) => {
  const bookingOptions = {
    method: 'POST',
    url: 'https://booking.guesty.com/oauth2/token',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      'grant_type': 'client_credentials',
      'scope': 'booking_engine:api',
      'client_secret': clientSecret,
      'client_id': clientId,
    },
  };

  request(bookingOptions, (error, response, body) => {
    if (error) {
      console.error('Error getting booking access token:', error);
      return res.status(500).json({ error: 'Error getting booking access token' });
    }

    const responseBody = JSON.parse(body);

    // Cache the new booking token with an expiration time (in seconds)
    bookingTokenCache.set('guestyBookingAccessToken', responseBody.access_token, responseBody.expires_in);

    console.log('New booking token obtained and cached:', responseBody.access_token);
    req.guestyBookingToken = responseBody.access_token;
    next();
  });
};


module.exports = {
  accessBookingToken
};
