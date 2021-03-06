const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationdriveSchema = new Schema({
  "type": {
    "type": "String" // usually just Feature
  },
  "typeOfFeat": {
    "type": "String" // usually just Donation Drive
  },
  "google_form": {
    "type": "Boolean" // true or false whether came from Form Responses
  },
  "properties": {
    "reportdate": {
      "type": "String" // Date Last Updated
    },
    "cfname": {
      "type": "String" // Donation Drive Name
    },
    "user_id": {
      "type": "String" // Unique identifier for the Donation Drive
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
    "supply_need": { // Weekly Supply Needs
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
      "food": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "transportation": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "storage": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "manpower": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "monetary": {
        "type": "Boolean" // true or false whether came accepting or not
      }
    },
    "lab_need": { // Laboratory Supply Needs
      "rtpcr": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "rna_extraction": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "filter_tip_1000": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "filter_tip_200": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "filter_tip_10": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "micro_tube": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "cryogenic_vial": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "biohazard_bag": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "qpcr_plate": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "adhesive_film": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "ethanol": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "trash_bag": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "abs_sheet": {
        "type": "Boolean" // true or false whether came accepting or not
      },
      "nacl": {
        "type": "Boolean" // true or false whether came accepting or not
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
        "Number" // Coordinates of Donation Drive [Longitude, Latitude]
      ]
    }
  }
});

const DonationDrive = mongoose.model('Donation Drive', donationdriveSchema, 'donationdrives');

module.exports = DonationDrive;