const express = require("express")
const app = express()
require("dotenv").config()

// this connects us to the external database
require("./config/dbConnect").connect()

// port on which the server is spun
const PORT = process.env.PORT || 4000;

// this spins up the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})