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
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
  })
);

app.use(bodyParser.json({ limit: '50mb' }));
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

const newhospitalsRouter = require('./routes/newhospitals');
const facilityRouter = require('./routes/facility');
const userRouter = require('./routes/user');
const hospitallogsRouter = require('./routes/hospitallogs');
const announcementsRouter = require('./routes/announcement');
const donationsRouter = require('./routes/donation');
const donationdrivesRouter = require('./routes/donationdrive');
const userlogsRouter = require('./routes/userlog');
const loginRouter = require('./routes/login');
const contactRouter = require('./routes/contact');
const maincontactRouter = require('./routes/maincontact');
const regionsRouter = require('./routes/regions');
const provincesRouter = require('./routes/provinces');
const citiesRouter = require('./routes/cities');
const messagesRouter = require('./routes/outgoingMessage');
const allocationsRouter = require('./routes/allocation');
const statusRouter = require('./routes/status')

app.use('/h0zPiTaLs', newhospitalsRouter);
app.use('/facility', facilityRouter);
app.use('/uz3rz', userRouter);
app.use('/hl0gs', hospitallogsRouter);
app.use('/ann0unc3m3nt', announcementsRouter);
app.use('/d0nati0n', donationsRouter);
app.use('/all0cati0n', allocationsRouter);
app.use('/all0c', statusRouter)
app.use('/d0ndriv3z', donationdrivesRouter);
app.use('/uz3rl0gz', userlogsRouter);
app.use('/send', contactRouter);
app.use('/sendMain', maincontactRouter);
app.use('/regions', regionsRouter);
app.use('/provinces', provincesRouter);
app.use('/cities', citiesRouter);
app.use('/m355ag3s', messagesRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//MongoDB connection string
// const uri = "mongodb+srv://rvramos:rvramos@trams-cluster-xmna9.mongodb.net/heroku_4gm4k4rf?retryWrites=true&w=majority"
const uri = "mongodb+srv://rvramos:rvramos@project-trams.xmna9.mongodb.net/trams-db?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).catch(error => handleError(error));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});