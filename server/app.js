//NPM Stuff
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const passport = require('passport')
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
  }

//Require a bunch of garbo
require("dotenv").config()
require("./utils/database")
require("./strats/JwtStrat")
require("./strats/LocalStrat")
require("./authenticate")

//Local Files
const Task = require('./models/task')
const User = require('./models/users')
const taskRoutes = require('./routes/task')
const userRoutes = require("./routes/user")

const PORT = process.env.PORT || 8080;
const app = express();


// Add the client URL to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []
const corsOptions = {
  
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  withCredentials:true
  
}
//Allow app to make HTTP requests to express app
app.use(cors(corsOptions))


//Random Settings 
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan('tiny'));
app.use(express.json())


//Passport 
app.use(passport.initialize())

//Routes
app.use("/tasks",taskRoutes);
app.use("/users", userRoutes)

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`)
})