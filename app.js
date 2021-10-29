const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const ejs = require('ejs');


app.use(express.static("public"));
var session = require('express-session');

var cookieParser = require('cookie-parser');


// console.log(session);
const studentRoutes = require("./routes/student");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const iepRoutes = require("./routes/iep");
const adminRoute = require("./routes/admin.js");

const mysqlConnection = require('./config/database');


const expressLayouts = require('express-ejs-layouts');
const files = require('./routes/files');
const dataRoutes = require('./routes/datatracking');
const worksheetRoutes = require('./routes/worksheets');
// const teacher = require('./routes/auth/sess')
app.use(cookieParser());






app.use(session({
    secret: 'worksheetswelove',
    resave: true,
    saveUninitialized: true,
    maxAge: Date.now() + (30 * 86400 * 1000)
})); // session secret



// USE BODY-PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: false }));



app.use('/datatracking', dataRoutes);
app.use('/student', studentRoutes);
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/worksheet', worksheetRoutes);
app.use('/files', files);
app.use('/iep', iepRoutes);
app.use('/admin', adminRoute);
app.use(express.json());

// SET VIEW ENGINE
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
  });
  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "USD",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
  });


app.listen('50000', () => {
    console.log("server started on port 50000");
});

module.exports = app;


