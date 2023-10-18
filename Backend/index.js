const express = require('express')
const cors = require("cors")
const { connection } = require('./db')

require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Basic API Endpoint")
})


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to the DB")
    } catch (error) {
        console.log(error)
        console.log("Cannot connect to the DB")
    }
    console.log(`Server is running at port ${process.env.PORT}`)
})