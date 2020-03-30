const router = require('express').Router();
let Facility = require('../models/facility.model');

//gets facility data from database
router.route('/').get((req, res) => {
  Facility.find()
    .then(facilities => res.json(facilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds facility info in the facility database
router.route('/add').post((req, res) => {
  const type = req.body.type;
  const typeOfFeat = req.body.typeOfFeat;
  const properties = req.body.properties;
  const geometry = req.body.geometry;

  const newFacility = new Facility({
    type,
    typeOfFeat,
    properties,
    geometry
});

  newFacility.save()
    .then(() => res.json('Facility added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//finds facility using id
router.route('/:id').get((req, res) => {
  Facility.findById(req.params.id)
    .then(facilities => res.json(facilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a facility
router.route('/:id').delete((req, res) => {
  Facility.findByIdAndDelete(req.params.id)
    .then(() => res.json('Facility deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates info about facility
router.route('/update/:id').post((req, res) => {
  Facility.findById(req.params.id)
    .then(facility => {
      facility.type = req.body.type;
      facility.typeOfFeat = req.body.typeOfFeat;
      facility.properties = req.body.properties;
      facility.geometry = req.body.geometry;

      facility.save()
        .then(() => res.json('Facility updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
