const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
require("dotenv").config({ path: "./config/.env" });
app.use(cors(
    {
        origin:["https://www.agriturismo-santommaso.com","https://booking-through-aqib.vercel.app","http://localhost:5173","https://it.agriturismo-santommaso.com","https://it.agriturismo-santommaso.com","https://booking.agriturismo-santommaso.com"
    

],
        // origin:,
        withCredentials:true,
        credentials:true  
    }
    

));
const routes = require('./routes/routes');
// create a hello route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

