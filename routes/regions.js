const router = require('express').Router();
let region = require('../models/regions.model');

router.route('/').get((req, res)=>{
    region.find()
        .then(regions => res.json(regions))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res)=>{
    const type = req.body.type;
    const geometry = req.body.geometry;
    const properties = req.body.properties;
   
    const newRegion = new region({
        type,
        geometry,
        properties
    });

    newRegion.save()
        .then(() => res.json('Region added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').get((req, res) => {
    region.findById(req.params.id)
        .then(regions => res.json(regions.properties))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/update/:id').post((req, res) => {
    region.findById(req.params.id)
        .then(regions => {
        regions.type = req.body.type;
        regions.geometry = req.body.geometry;
        regions.properties = req.body.properties;
     
        regions.save()
            .then(() => res.json('Region updated!' + req.body))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').delete((req, res) => {
    region.findByIdAndDelete(req.params.id)
        .then(() => res.json('Region deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;