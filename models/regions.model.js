const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const regionsSchema = new Schema({
        "type":{"type":"String"},
        "properties":{
            "REGION": {"type":"String"},
            "HOSPCOUNT1": {"type":"number"}
        },
        "geometry":{
            "type":{"type":"String"},
            "coordinates":{"type":"array"}
        }
    });

const Regions = mongoose.model('Regions', regionsSchema, 'regions');

module.exports = Regions;