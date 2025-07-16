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

app.use(cors({
  origin: 'https://your-frontend-domain.com', // or use function for dynamic origin
  credentials: true
}));
//middleware
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://gymfreaks.vercel.app'
// ];
app.use(express.json());
// app.use(cors({
//   origin: '*'
// }));
progressRoutes(app);
authRoutes(app);


//mongodb connection
mongoConnect(URI);

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})