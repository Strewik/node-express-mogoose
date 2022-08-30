const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// -------------------------
const passport = require('passport');

const workerRoutes = require("./routes/workerRoutes");
//-------------------------------
const SignupRoutes = require("./routes/Signup");
const LoginRoutes = require("./routes/loginRoutes");

//-----------------------------
const Signup = require('./models/Signup');

//--------------------------------
// Express session
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  });

const app = express();

const port = process.env.PORT || 3000;


// setting engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");
//---------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// Setting middleware
app.use(express.urlencoded({ extended: true }));


// Database connection settings
mongoose.connect("mongodb://localhost:27017/farm",
    { useNewUrlParser: true,
    useUnifiedTopology: true},
    (err) => {
        if(!err) console.log("Connected to mongo DB");
        else console.log("Error connecting to mongoDB  " + err)
    })

//---------------------------------
// Setting up express session
app.use(expressSession);


//----------------------------------
// configuring passport
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());


app.use("/", workerRoutes);
//-------------------------------------
app.use("/", SignupRoutes);
app.use("/", LoginRoutes);



app.listen(port);
console.log('Server started at http://localhost:' + port);

