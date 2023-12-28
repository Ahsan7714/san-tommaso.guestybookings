const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config({path:"./config/.env"})
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

const routes=require('./routes/routes');

app.use('/api/v1',routes);



const port=process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});