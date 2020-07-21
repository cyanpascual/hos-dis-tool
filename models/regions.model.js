const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const regionsSchema = new Schema({
        "type":{"type":"String"},
        "geometry":{
            "type":{"type":"String"},
            "coordinates":{"type":"array"},
        },
        "properties":{
            "HospCount": {"type":"number"},
            "Region": {"type":"String"}
        }
    });

const Regions = mongoose.model('Regions', regionsSchema, 'regions');

module.exports = Regions;