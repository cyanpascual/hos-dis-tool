const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//facilities refers to suppliers of medical products
const facilitySchema = new Schema({
  "type": {"type": "String"},
  "typeOfFeat": {"type": "String"},
  "properties": {
    "Name_of_Fa": {"type": "String"},
    "Address": {"type": "String"},
    "Region": {"type": "String"},

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