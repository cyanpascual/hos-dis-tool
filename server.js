const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser");
const passport = require("passport");


require('dotenv').config();
// Passport config
require("./passport")(passport);

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  next();
});

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

const hospitalsRouter = require('./routes/hospitals');
const newhospitalsRouter = require('./routes/newhospitals');
const facilityRouter = require('./routes/facility');
const userRouter = require('./routes/user');
const hospitallogsRouter = require('./routes/hospitallogs');
const announcementsRouter = require('./routes/announcement');
const donationsRouter = require('./routes/donation');
const donationdrivesRouter = require('./routes/donationdrive');
const userlogsRouter = require('./routes/userlog');
const loginRouter = require('./routes/login');
// const contactRouter = require('./routes/contact')


app.use('/hospitals', hospitalsRouter);
app.use('/h0zPiTaLs', newhospitalsRouter);
app.use('/facility', facilityRouter);
app.use('/uz3rz', userRouter);
app.use('/hl0gs', hospitallogsRouter);
app.use('/ann0unc3m3nt', announcementsRouter);
app.use('/d0nati0n', donationsRouter);
app.use('/d0ndriv3z', donationdrivesRouter);
app.use('/uz3rl0gz', userlogsRouter);
// app.use('/send', contactRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//MongoDB connection string
const uri = "mongodb+srv://rvramos:rvramos@trams-cluster-xmna9.mongodb.net/heroku_4gm4k4rf?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).catch(error => handleError(error));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});