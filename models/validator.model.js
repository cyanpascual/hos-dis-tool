const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//personnel refers to people affiliated with the hospitals
const validatorSchema = new Schema({
  "Surname": {"type": "String"},
  "Firstname": {"type": "String"},
  "Contact": {"type": "String"},
  "Email": {"type": "String"},
  "Affiliation": {"type": "String"},
  "Username": {"type": "String"},
  "Password": {"type": "String"},
});

const Validator = mongoose.model('Validator', validatorSchema);

module.exports = Validator;