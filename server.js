const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const path = require('path');



app.use(cors());
app.use(express.json());

//MongoDB connection string

const uri = "mongodb+srv://rvramos:r3m3mb3R*@trams-2qp2z.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, 
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*',(req, res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
  
}

const hospitalsRouter = require('./routes/hospitals');
const facilityRouter = require('./routes/facility');
const userRouter = require('./routes/user');

app.get('/api/hospitals', async (req, res) => {
  try {
    res.json(await hospitals.find())
    // Post is a mongoose schema we've defined in /models
    // .find() is a method on the model for fetching all documents
  } catch (err) {
    res.json({message: err})
  }
})

app.get('/api/facility', async (req, res) => {
  try {
    res.json(await facility.find())
    // Post is a mongoose schema we've defined in /models
    // .find() is a method on the model for fetching all documents
  } catch (err) {
    res.json({message: err})
  }
})

app.get('/api/user', async (req, res) => {
  try {
    res.json(await user.find())
    // Post is a mongoose schema we've defined in /models
    // .find() is a method on the model for fetching all documents
  } catch (err) {
    res.json({message: err})
  }
})
  

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});