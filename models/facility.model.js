const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//facilities refers to suppliers of medical products
const facilitySchema = new Schema({
  "type": {"type": "String"},
  "typeOfFeat": {"type": "String"},
  "properties": {
    "Name_of_Fa": {"type": "String"},
    "Address": {"type": "String"},
    "Google_Plu": {"type": "String"},

    "Supply_Cur": {
      "Alcohol": {"type": "Number"},
      "Strerilium/Disinfectant": {"type": "Number"},
      "Antibacterial Soap": {"type": "Number"},
      "Sanitizing agents": {"type": "Number"},
      "Gloves (disposable)/ Foot socks": {"type": "Number"},
      "PPE": {"type": "Number"},
      "Goggles/face shields": {"type": "Number"},
      "Tissue": {"type": "Number"},
      "Other Needs": {"type": "String"}
    },
    "Contact Person": {"type": "String"},
    "Contact Numbers": {"type": "String"}
  },
  "geometry": {
    "type": {"type": "String"},
    "coordinates": {
      "type": ["Number"]
    }
  }
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;