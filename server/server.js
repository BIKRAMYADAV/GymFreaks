const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT 
const express = require('express')
const app = express()

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})