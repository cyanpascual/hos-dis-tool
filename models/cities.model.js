const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citiesSchema = new Schema({
        "type":{"type":"String"},
        "properties":{
            "ID_1": {"type":"number"},
            "ID_2": {"type":"number"},
            "PROVINCE": {"type":"String"},
            "REGION": {"type":"String"},
            "CITY": {"type":"String"},
            "HOSPCOUNT3": {"type":"number"}            
        },
        "geometry":{
            "type":{"type":"String"},
            "coordinates":{"type":"array"},
        }
    });

const Cities = mongoose.model('Cities', citiesSchema, 'cities');

module.exports = Cities;