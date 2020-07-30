const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allocationSchema = new Schema({
  "type": {
    "type": "String" // usually just Allocation
  },
  "properties": {
    "supplier": {
      "type": "String" // Unique identifier for the Donation Drive or Donor
    },
    "supply": {
      "type": "String" // Alcohol (in liters)
    },
    "amount": {
      "type": "Number" // Quantity
    },
    "cost": {
      "type": "Number" // Price multiplied by quantity
    },
    "orderdate": {
      "type": "String" // Date of Donation
    },
    "benefactor": {
      "type": "String" // Can be for the hospital or other changesS
    },
    "hfhudcode": {
      "type": "String"  // Unique identifier for the health facility based on the National Health Facility Registry
    },
    "method": {
      "type": "String" // Method of Payment
    },
    "cont_num": {
      "type": "String" // Contact Number of Supplier
    },
    "status": {
      "type": "String" // Pledged, Received, Allocated, Distributed
    }
  }
});

const Allocation = mongoose.model('New Allocation', allocationSchema, 'allocations');

module.exports = Allocation;