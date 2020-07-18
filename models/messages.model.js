const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//user refers to people affiliated with the hospitals or validators, distinguished by type
const messages = new Schema({
  "type": {"type": "String"},
  "properties": {
    "Date": {"type": "String"},
    "Recipient": {"type": "String"},
    "Message": {"type": "String"}
  }
});

const newMessage = mongoose.model('newMessage', messages, 'outgoing');

module.exports = newMessage;