const router = require('express').Router();
let city = require('../models/cities.model');

router.route('/').get((req, res)=>{
    city.find()
        .then(cities => res.json(cities))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res)=>{
    const type = req.body.type;
    const geometry = req.body.geometry;
    const properties = req.body.properties;
   
    const newCity = new city({
        type,
        geometry,
        properties
    });

    newCity.save()
        .then(() => res.json('City added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').get((req, res) => {
    city.findById(req.params.id)
        .then(cities => res.json(cities.properties))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/update/:id').post((req, res) => {
    city.findById(req.params.id)
        .then(cities => {
        cities.type = req.body.type;
        cities.geometry = req.body.geometry;
        cities.properties = req.body.properties;
     
        cities.save()
            .then(() => res.json('City updated!' + req.body))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').delete((req, res) => {
    city.findByIdAndDelete(req.params.id)
        .then(() => res.json('City deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;