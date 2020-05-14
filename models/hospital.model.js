const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  "type": {"type": "String"},
  "typeOfFeat": {"type": "String"},
  "properties": {
    "Name_of_Ho": {"type": "String"},
    "HospitalID": {"type": "String"}, //Hospital ID from DOH?
    "Address": {"type": "String"},
    "City/Municipality": {"type": "String"},
    "Province": {"type": "String"},
    "Region": {"type": "String"},
    "DOH Level": {"type": "String"},
    "Capacity": {"type": "String"},
    "ICU Capacity": {"type": "String"},
    "Ventilators": {"type": "String"},
    "Supply_Cap": {
      "Alcohol": {"type": "Number"},
      "Disinfectant (Sterilium)": {"type": "Number"},
      "Antibacterial Soap": {"type": "Number"},
      "Surgical Gowns": {"type": "Number"},
      "Surgical Masks": {"type": "Number"},
      "N95 Masks": {"type": "Number"},
      "Gloves": {"type": "Number"},
      "Shoe covers": {"type": "Number"},
      "PPE": {"type": "Number"},
      "Goggles and face shields": {"type": "Number"},
      "Testing Kits": {"type": "Number"},
      "Tissue": {"type": "Number"},
      "Vitamins": {"type": "Number"},
      "Food (Meals)": {"type": "Number"},
      "Other Needs": {"type": "String"}
    },

    "Supply_Cur": {
      "Alcohol": {"type": "Number"},
      "Disinfectant (Sterilium)": {"type": "Number"},
      "Antibacterial Soap": {"type": "Number"},
      "Surgical Gowns": {"type": "Number"},
      "Surgical Masks": {"type": "Number"},
      "N95 Masks": {"type": "Number"},
      "Gloves": {"type": "Number"},
      "Shoe covers": {"type": "Number"},
      "PPE": {"type": "Number"},
      "Goggles and face shields": {"type": "Number"},
      "Testing Kits": {"type": "Number"},
      "Tissue": {"type": "Number"},
      "Vitamins": {"type": "Number"},
      "Food (Meals)": {"type": "Number"},
      "Other Needs": {"type": "String"}
    },

    "Contact Person": {"type": "String"},
    "Contact Numbers": {"type": "String"},
    "Email Address": {"type": "String"},
    "Website": {"type": "String"},
    "Last Update": {"type": "String"}
  },
  "geometry": {
    "type": {"type": "String"},
    "Coordinates": {
      "type": ["Number"]
    }
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;