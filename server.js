const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build')); 
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const hospitalsRouter = require('./routes/hospitals');
const facilityRouter = require('./routes/facility');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');


app.use('/hospitals', hospitalsRouter);
app.use('/facility', facilityRouter);
app.use('/user', userRouter);
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