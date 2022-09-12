require('dotenv').config()
const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo')

const passport = require('passport');

// Routes
const groceriesRouter = require('./routes/groceries')
const authRouter = require('./routes/auth')
const marketRouter = require('./routes/market')

require("./database")
// require("./strategies/local")
require('./strategies/discord')

const app = express();
const PORT = 3333;

// USING MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());


app.use(cookieParser())
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/expressJs_tutorial'
    })
}))

app.use((req,res,next)=>{
    console.log(`${req.method}:${req.url}`);
    next();
})


app.use(passport.initialize())
app.use(passport.session())


// ROUTES
app.use('/api/groceries',groceriesRouter)
app.use('/api/market',marketRouter)
app.use('/api/auth',authRouter)



app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})


// Query parameter : https://www.google.com/?q=