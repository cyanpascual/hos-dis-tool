const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const provincesSchema = new Schema({
        "type":{"type":"String"},
        "geometry":{
            "type":{"type":"String"},
            "coordinates":{"type":"array"},
        },
        "properties":{
            "HospCount2": {"type":"number"},
            "Province": {"type":"String"},
            "Region": {"type":"String"}
        }
    });

const Provinces = mongoose.model('Provinces', provincesSchema, 'provinces');

module.exports = Provinces;