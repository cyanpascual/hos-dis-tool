const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//user refers to people affiliated with the hospitals or validators, distinguished by type
const userSchema = new Schema({
  "type": {"type": "String"},
  "properties": {
    "Surname": {"type": "String"},
    "Firstname": {"type": "String"},
    "Username": {"type": "String"},
    "loginDate": {"type": "String"}
  }
});

const User = mongoose.model('userLog', userSchema, 'userlogs');

module.exports = User;