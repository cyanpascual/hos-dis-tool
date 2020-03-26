const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  type: "Feature",
  typeofFeat: "hospital",
  properties: {
    Name_of_Ho: {type: String, required: true, unique: true, trim: true, minlength: 3},
    Address: {type: String, required: true, trim: true},
    Google_Plu: {type: String, required: true, trim: true},
    Supply_Cap: {type: String, required: true, trim: true},
    Supply_Cur: {type: String, required: true, trim: true},
    Head: {type: String, required: true, trim: true},
    Website: {type: String, required: true, trim: true},
    Contact_Num: {type: String, required: true, trim: true},
  },
  geometry: {
    type: "Point",
    coordinates: {type: String, required: true, trim: true},
  },
}, {
  timestamps: true,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;