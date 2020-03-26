const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  hospital: {type: String, required: true, unique: true, trim: true, minlength: 3},
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;