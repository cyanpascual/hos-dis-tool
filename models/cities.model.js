const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citiesSchema = new Schema({
        "type":{"type":"String"},
        "geometry":{
            "type":{"type":"String"},
            "coordinates":{"type":"array"},
        },
        "properties":{
            "HospCount3": {"type":"number"},
            "City": {"type":"String"},
            "Province": {"type":"String"},
            "Region": {"type":"String"}
        }
    });

const Cities = mongoose.model('Cities', citiesSchema, 'cities');

module.exports = Cities;