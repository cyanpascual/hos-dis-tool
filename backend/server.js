const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//MongoDB connection string
const uri = "mongodb+srv://dbUser:dbUserPassword@trams-fjjjm.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const hospitalsRouter = require('./routes/hospitals');
const facilityRouter = require('./routes/facility');
const personnelRouter = require('./routes/personnel');
const validatorRouter = require('./routes/validator');
const contributorRouter = require('./routes/contributor');

app.use('/hospitals', hospitalsRouter);
app.use('/facility', facilityRouter);
app.use('/personnel', personnelRouter);
app.use('/validator', validatorRouter);
app.use('/contributor', contributorRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});