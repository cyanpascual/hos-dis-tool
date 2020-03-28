const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//personnel refers to people affiliated with the hospitals
const personnelSchema = new Schema({
  "Surname": {"type": "String"},
  "Firstname": {"type": "String"},
  "Designation": {"type": "String"},
  "Contact": {"type": "String"},
  "Email": {"type": "String"},
  "Username": {"type": "String"},
  "Password": {"type": "String"},
  "HospitalID": {"type": "String"} //Hospital Name or Hospital ID(?)
});

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel;