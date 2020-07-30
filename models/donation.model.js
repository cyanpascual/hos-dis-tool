const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  "type": {
    "type": "String" // usually just Donation
  },
  "properties": {
    "donor_name": {
      "type": "String" // Unique identifier for the Donation Drive or Donor
    },
    "affiliation": {
      "type": "String" // Affiliation
    },
    "amount": {
      "type": "Number" // Amount Donated
    },
    "donation_supply": {
      "type": "String" // Alcohol (in liters)
    },
    "cfname": {
      "type": "String" // Hospital Name
    },
    "hfhudcode": {
      "type": "String"  // Unique identifier for the health facility based on the National Health Facility Registry
    },
    "reportdate": {
      "type": "String" // Date of Donation
    },
    "bank": {
      "type": "String" // Method of Payment
    },
    "cont_num": {
      "type": "String" // Contact Number of Donor
    },
    "status": {
      "type": "String" // Pledged, Received, Allocated, Distributed
    },
    "receipt": {
      "type": "Mixed" // Proof
    },
    "email": {
      "type": "String" // Email Address
    }
  }
});

const Donation = mongoose.model('New Donation', donationSchema, 'donations');

module.exports = Donation;