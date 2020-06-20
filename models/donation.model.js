const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  "type": {
    "type": "String" // usually just Donation
  },
  "properties": {
    "cfname": {
      "type": "String" // Facility Name
    },
    "hfhudcode": {
      "type": "String"  // Unique identifier for the health facility based on the National Health Facility Registry
    },
    "donation_supply": { // Donation for Supply Needs
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
    "donation_lab": { // Donation for Laboratory Needs
      "rtpcr": {
        "type": ["Mixed"]
      },
      "rna_extraction": {
        "type": ["Mixed"]
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
    "donor": {
      "type": "String" // Name of Donor
    },
    "cont_num": {
      "type": "String" // Contact Number of Donor
    },
    "email": {
      "type": "String" // Email Address
    },
    "reportdate": {
      "type": "String" // Date Last Updated
    }
  }
});

const Donation = mongoose.model('New Donation', donationSchema, 'donations');

module.exports = Donation;