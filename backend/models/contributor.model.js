const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//personnel refers to people affiliated with the hospitals
const contributorSchema = new Schema({
  "Surname": {"type": "String"},
  "Firstname": {"type": "String"},
  "Contact": {"type": "String"},
  "Email": {"type": "String"},
});

const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;