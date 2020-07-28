const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const provincesSchema = new Schema({
        "type":{"type":"String"},
        "properties":{
            "HOSPCOUNT2": {"type":"number"},
            "PROVINCE": {"type":"String"},
            "REGION": {"type":"String"}
        },
        "geometry":{
            "type":{"type":"String"},
            "coordinates":{"type":"array"},
        }
    });

const Provinces = mongoose.model('Provinces', provincesSchema, 'provinces');

module.exports = Provinces;