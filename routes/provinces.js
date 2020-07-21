const router = require('express').Router();
let province = require('../models/provinces.model');

router.route('/').get((req, res)=>{
    province.find()
        .then(provinces => res.json(provinces))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res)=>{
    const type = req.body.type;
    const geometry = req.body.geometry;
    const properties = req.body.properties;
   
    const newProvince = new province({
        type,
        geometry,
        properties
    });

    newProvince.save()
        .then(() => res.json('Province added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').get((req, res) => {
    province.findById(req.params.id)
        .then(provinces => res.json(provinces.properties))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/update/:id').post((req, res) => {
    province.findById(req.params.id)
        .then(provinces => {
        provinces.type = req.body.type;
        provinces.geometry = req.body.geometry;
        provinces.properties = req.body.properties;
     
        provinces.save()
            .then(() => res.json('Province updated!' + req.body))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').delete((req, res) => {
    province.findByIdAndDelete(req.params.id)
        .then(() => res.json('Province deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;