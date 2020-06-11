const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationdriveSchema = new Schema({
  "type": {
    "type": "String" // usually just Feature
  },
  "typeOfFeat": {
    "type": "String" // usually just Supplier
  },
  "google_form": {
    "type": "Boolean" // true or false whether came from Form Responses
  },
  "properties": {
    "reportdate": {
      "type": "String" // Date Registered
    },
    "cfname": {
      "type": "String" // Donation Drive Name
    },
    "address": {
      "type": "String" // Full Address
    },
    "city": {
      "type": "String" // City (for sorting purposes)
    },
    "prov": {
      "type": "String" // Province (for sorting purposes)
    },
    "region": {
      "type": "String" // Region (for sorting purposes)
    },
    "available": { // Services Offered/ What they sell
      "alcohol": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "disinfectant": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "soap": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "gown": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "surgmask": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "n95mask": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "gloves": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "shoe_cover": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "coverall": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "goggles": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "face_shield": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "head_cover": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "tissue": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "vitamins": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "other": {
        "type": "String" // other things they sell
      }
    },
    "quantity": { // Quantity of Supplies they have left; not all have this
      "alcohol": {
        "type": "Number" // Alcohol (in liters)
      },
      "disinfectant": {
        "type": "Number" // Disinfectant/Sterilium (in liters)
      },
      "soap": {
        "type": "Number" // Antibacterial Soap (in pieces)
      },
      "gown": {
        "type": "Number" // Gowns/ PPEs (in pieces)
      },
      "surgmask": {
        "type": "Number" // Surgical Masks (in pieces)
      },
      "n95mask": {
        "type": "Number" // N95 masks (in pieces)
      },
      "gloves": {
        "type": "Number" // Clean Gloves (in pairs)
      },
      "shoe_cover": {
        "type": "Number" // Shoe Covers/ Booties (in pairs)
      },
      "coverall": {
        "type": "Number" // Coveralls (in pieces)
      },
      "goggles": {
        "type": "Number" // Goggles (in pieces)
      },
      "face_shield": {
        "type": "Number" // Face Shields (in pieces)
      },
      "head_cover": {
        "type": "Number" // Head Covers (in pieces)
      },
      "tissue": {
        "type": "Number" // Tissue (in rolls)
      },
      "vitamins": {
        "type": "Number" // Vitamins (in pieces)
      }
    },
    "cont_person1": {
      "type": "String" // Contact Person
    },
    "cont_num1": {
      "type": "String" // Contact Number
    },
    "email1": {
      "type": "String" // Email Address
    },
    "cont_person2": {
      "type": "String" // Contact Person
    },
    "cont_num2": {
      "type": "String" // Contact Number
    },
    "email2": {
      "type": "String" // Email Address
    },
    "website": {
      "type": "String" // Website
    },
    "email": {
      "type": "String" // Email
    },
    "instructions": {
      "type": "String" // Special Instructions
    }
  },
  "geometry": {
    "type": {
      "type": "String" // usually just Point
    },
    "coordinates": {
      "type": [
        "Number" // Coordinates of Supplier [Longitude, Latitude]
      ]
    }
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema, 'suppliers');

module.exports = Supplier;