const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
require("dotenv").config({ path: "./config/.env" });
app.use(cors(
    {
        origin:["*","https://it.booking.agriturismo-santommaso.com"],
        credentials:true,
        methods:["GET,HEAD,PUT,PATCH,POST,DELETE"],
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

