const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  "type": {"type": "String"},
  "typeOfFeat": {"type": "String"},
  "properties": {
    "Name_of_Ho": {"type": "String"},
    "Address": {"type": "String"},
    "Google_Plu": {"type": "String"},
    "Supply_Cap": {
      "Alcohol": {"type": "Number"},
      "Strerilium/Disinfectant": {"type": "Number"},
      "Antibacterial Soap": {"type": "Number"},
      "Sanitizing agents": {"type": "Number"},
      "Masks/respirators": {"type": "Number"},
      "Hepa filter and UV light radiation": {"type": "Number"},
      "Gloves (disposable)/ Foot socks": {"type": "Number"},
      "PPE": {"type": "Number"},
      "Goggles/face shields": {"type": "Number"},
      "Bedside patient equipments": {"type": "Number"},
      "Testing Kits": {"type": "Number"},
      "Ventilators": {"type": "Number"},
      "Tissue": {"type": "Number"}
    },
    "Supply_Cur": {
      "Alcohol": {"type": "Number"},
      "Strerilium/Disinfectant": {"type": "Number"},
      "Antibacterial Soap": {"type": "Number"},
      "Sanitizing agents": {"type": "Number"},
      "Masks/respirators": {"type": "Number"},
      "Hepa filter and UV light radiation": {"type": "Number"},
      "Gloves (disposable)/ Foot socks": {"type": "Number"},
      "PPE": {"type": "Number"},
      "Goggles/face shields": {"type": "Number"},
      "Bedside patient equipments": {"type": "Number"},
      "Testing Kits": {"type": "Number"},
      "Ventilators": {"type": "Number"},
      "Tissue": {"type": "Number"},
      "Other Needs": {"type": "String"}
    },
    "Head": {"type": "String"},
    "Website": {"type": "String"},
    "Contact Numbers": {"type": "String"}
  },
  "geometry": {
    "type": {"type": "String"},
    "coordinates": {
      "type": ["Number"]
    }
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;