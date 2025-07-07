const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT 
const URI = process.env.URI
const express = require('express')
const app = express()
const mongoConnect = require('./mongoDB/dbConnection')
const progressRoutes = require('./routes/progressRoutes')


//middleware
app.use(express.json());
progressRoutes(app);


//mongodb connection
mongoConnect(URI);

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})