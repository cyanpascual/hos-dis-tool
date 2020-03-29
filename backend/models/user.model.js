const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//user refers to people affiliated with the hospitals or validators, distinguished by type
const userSchema = new Schema({
  "type": {"type": "String"},
  "properties": {
    "Surname": {"type": "String"},
    "Firstname": {"type": "String"},
    "Designation": {"type": "String"},
    "Affiliation": {"type": "String"},
    "Contact": {"type": "String"},
    "Email": {"type": "String"},
    "Username": {"type": "String"},
    "Password": {"type": "String"},
    "HospitalID": {"type": "String"} //Hospital ID from DOH?
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;