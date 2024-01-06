const express = require('express');
const request = require('request');
const NodeCache = require('node-cache');

const app = express();
const tokenCache = new NodeCache();

// Your Guesty API credentials
const clientId = '0oae4zuh0mzZ7f0cM5d7';
const clientSecret = 'o-AQ0Jmn9nUUgk8IYUnNVrP7LgTBpFB6A9k2eWaKGwbACK_U4l7ISIw1Okk-ebne';

// Middleware to handle access token
const accessTokenMiddleware = (req, res, next) => {
  // Check if the token is already in the cache
  const cachedToken = tokenCache.get('guestyAccessToken');

  if (cachedToken) {
    // Token is in the cache, check if it's expired
    const expirationTime = tokenCache.getTtl('guestyAccessToken');
    const currentTime = Math.floor(Date.now() / 1000);

    if (expirationTime > currentTime) {
      // Token is still valid, use it
      console.log('Using cached token:', cachedToken);
      req.guestyAccessToken = cachedToken;
      next();
    } else {
      // Token has expired, request a new one
      console.log('Cached token expired, requesting a new one...');
      requestNewAccessToken(req, next);
    }
  } else {
    // Token is not in the cache, request a new one
    console.log('No cached token found, requesting a new one...');
    requestNewAccessToken(req, next);
  }
};

// Function to request a new access token
const requestNewAccessToken = (req,next) => {
  const options = {
    method: 'POST',
    url: 'https://open-api.guesty.com/oauth2/token',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      'grant_type': 'client_credentials',
      'scope': 'open-api',
      'client_secret': clientSecret,
      'client_id': clientId,
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error getting access token:', error);
      return res.status(500).json({ error: 'Error getting access token' });
    }

    const responseBody = JSON.parse(body);

    // Cache the new token with an expiration time (in seconds)
    tokenCache.set('guestyAccessToken', responseBody.access_token, responseBody.expires_in);

    console.log('New token obtained and cached:', responseBody.access_token);
    req.guestyAccessToken = responseBody.access_token;
    next();
  });
};

module.exports = {
  accessTokenMiddleware
};