const express = require("express");

const cookieParser = require("cookie-parser");
const groceriesRouter = require('./routes/groceries')
const authRouter = require('./routes/auth')
const marketRouter = require('./routes/market')
const session = require('express-session');

require("./database")

const app = express();
const PORT = 3333;

// USING MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(session({
    secret: "NALSDNOLN@#!",
    resave: false,
    saveUninitialized: false
}))

// ROUTES
app.use('/api/groceries',groceriesRouter)
app.use('/api/market',marketRouter)
app.use('/api/auth',authRouter)



app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})


// Query parameter : https://www.google.com/?q=