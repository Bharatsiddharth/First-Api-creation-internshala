require("dotenv").config({ path: "./.env"})
const express = require('express');
const app = express();

//db

require("./models/database").connectionDatabase();

// logger 
const logger = require('morgan');
const ErorrHandler = require("./utils/errorHandler");
const { genetatedError } = require("./middleware/error")
app.use(logger("tiny"))
//bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/indexRouter'));

// error handling 

app.all("*", (req, res, next) => {
    next(new ErorrHandler(`Req Url not found ${req.url}`, 404) )
})

app.use(genetatedError)

app.listen(process.env.PORT, console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`));