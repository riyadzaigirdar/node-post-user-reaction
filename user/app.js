require("dotenv").config();
const express = require("express");
const logger = require("./logger")

const app = express()

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/im/api/v1", require("./routes/"));

port = process.env.port || 3001
app.listen(port, ()=> console.log(`app listening on port ${port}`))


