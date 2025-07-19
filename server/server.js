const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const PORT = process.env.PORT 
const URI = process.env.URI
const express = require('express')
const app = express()
const mongoConnect = require('./mongoDB/dbConnection')
const progressRoutes = require('./routes/progressRoutes')
const authRoutes = require('./routes/authRoutes')
const gymRoutes = require('./routes/gymRoutes')

app.use(cors());

app.use(express.json());

progressRoutes(app);
authRoutes(app);
gymRoutes(app);

//mongodb connection
mongoConnect(URI);

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})