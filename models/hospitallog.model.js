const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  "type": {
    "type": "String" // usually just Feature
  },
  "typeOfFeat": {
    "type": "String" // usually just Hospital
  },
  "data_drop": {
    "type": "Boolean" // true or false whether part of DOH DataDrop App
  },
  "priority": {
    "type": "Boolean" // true or false whether part of TrAMS 48 hospitals
  },
  "test_center": {
    "type": "Boolean" // true or false whether testing center
  },
  "numbers": {
    "type": "Boolean" // true or false whether hospital wants to show hard numbers
  },
  "properties": {
    "cfname": {
      "type": "String" // Facility Name
    },
    "hfhudcode": {
      "type": "String"  // Unique identifier for the health facility based on the National Health Facility Registry
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
    "doh_level": {
      "type": "String" // DOH Level whether primary (1), secondary (2), tertiary (3), specialty
    },
    "capacity": {
      "icu_v": {
        "type": "Number" // number of vacant ICU beds
      },
      "icu_o": {
        "type": "Number" // number of occupied ICU beds
      },
      "isolbed_v": {
        "type": "Number" // number of vacant isolation beds
      },
      "isolbed_o": {
        "type": "Number" // number of occupied isolation beds
      },
      "beds_ward_v": {
        "type": "Number" // number of vacant beds in COVID ward
      },
      "beds_ward_o": {
        "type": "Number" // number of occupied beds in COVID ward
      },
      "mechvent_v": {
        "type": "Number" // number of vacant mechanical ventilators
      },
      "mechvent_o": {
        "type": "Number" // number of occupied mechanical ventilators
      }
    },
    "supply_need": { // Weekly Supply Needs
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
      },
      "filter_tip_1000": {
        "type": "Number" // Filter pipette tips, 1000 uL
      },
      "filter_tip_200": {
        "type": "Number" // Filter pipette tips, 200 uL
      },
      "filter_tip_10": {
        "type": "Number" // Filter pipette tips, 10 uL
      },
      "micro_tube": {
        "type": "Number" // Microcentrifuge tubes, 1.5mL
      },
      "cryogenic_vial": {
        "type": "Number" // Cryogenic vials, 2mL
      },
      "biohazard_bag": {
        "type": "Number" // Biohazard bags (S, M, L)
      },
      "qpcr_plate": {
        "type": "Number" // qPCR plates
      },
      "adhesive_film": {
        "type": "Number" // Adhesive films
      },
      "ethanol": {
        "type": "Number" // Absolute ethanol
      },
      "trash_bag": {
        "type": "Number" // Yellow trash bags (S, M, L)
      },
      "abs_sheet": {
        "type": "Number" // Absorbent sheets
      },
      "nacl": {
        "type": "Number" // NaCl (for diluting viscous samples, other than NPS/OPS)
      }
    },
    "supply_cur": { // Current Supply Needs
      "alcohol": {
        "type": "Number" // Alcohol (in liters)
      },
      "disinfectant": {
        "type": "Number" // Disinfectant/ Sterilium (in liters)
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
        "type": "Number" // N95 Masks (in pieces)
      },
      "gloves": {
        "type": "Number" // Clean Gloves (in pairs)
      },
      "shoe_cover": {
        "type": "Number" // Shoe Covers (in pairs)
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
      },
      "filter_tip_1000": {
        "type": "Number" // Filter pipette tips, 1000 uL
      },
      "filter_tip_200": {
        "type": "Number" // Filter pipette tips, 200 uL
      },
      "filter_tip_10": {
        "type": "Number" // Filter pipette tips, 10 uL
      },
      "micro_tube": {
        "type": "Number" // Microcentrifuge tubes, 1.5mL
      },
      "cryogenic_vial": {
        "type": "Number" // Cryogenic vials, 2mL
      },
      "biohazard_bag": {
        "type": "Number" // Biohazard bags (S, M, L)
      },
      "qpcr_plate": {
        "type": "Number" // qPCR plates
      },
      "adhesive_film": {
        "type": "Number" // Adhesive films
      },
      "ethanol": {
        "type": "Number" // Absolute ethanol
      },
      "trash_bag": {
        "type": "Number" // Yellow trash bags (S, M, L)
      },
      "abs_sheet": {
        "type": "Number" // Absorbent sheets
      },
      "nacl": {
        "type": "Number" // NaCl (for diluting viscous samples, other than NPS/OPS)
      },
      "other": {
        "type": "String" // For other hospital needs (may be left blank)
      }
    },
    "cont_person": {
      "type": "String" // Contact Person
    },
    "cont_num": {
      "type": "String" // Contact Number
    },
    "email": {
      "type": "String" // Email Address
    },
    "website": {
      "type": "String" // Website
    },
    "reportdate": {
      "type": "String" // Date Last Updated
    }
  },
  "geometry": {
    "type": {
      "type": "String" // usually just Point
    },
    "coordinates": {
      "type": [
        "Number" // Coordinates of Hospital [Longitude, Latitude]
      ]
    }
  }
});

const Hospital = mongoose.model('Hospital Log', hospitalSchema, 'hospitallogs');

module.exports = Hospital;