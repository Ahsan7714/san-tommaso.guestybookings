const generateGuestyToken = async (req, res, next) => {
    try {
      const options = {
        method: 'POST',
        url: 'https://open-api.guesty.com/oauth2/token',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'grant_type': 'client_credentials',
          'scope': 'open-api',
          'client_secret': process.env.GUESTY_CLIENT_SECRET,
          'client_id':process.env.GUESTY_CLIENT_ID,
        }
      };
  
      const response = await fetch(options.url, { method: options.method, headers: options.headers, body: new URLSearchParams(options.form) });
      const data = await response.json();
  
      if (!data.access_token) {
        throw new Error('Failed to obtain Guesty API token');
      }
  
      req.guestyToken = data.access_token;
      next();
    } catch (error) {
      console.error('Error generating Guesty API token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  module.exports = generateGuestyToken;