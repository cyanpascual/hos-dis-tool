const router = require('express').Router();
let Hospital = require('../models/hospital.model');

router.route('/').get((req, res) => {
  Hospital.find()
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const typeOfFeat = req.body.typeOfFeat;
  const properties = req.body.properties;
  const geometry = req.body.geometry;

  const newHospital = new Hospital({
    type,
    typeOfFeat,
    properties,
    geometry
});

  newHospital.save()
    .then(() => res.json('Hospital added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Hospital.findById(req.params.id)
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Hospital.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hospital deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Hospital.findById(req.params.id)
    .then(hospital => {
      hospital.type = req.body.type;
      hospital.typeOfFeat = req.body.typeOfFeat;
      hospital.properties = req.body.properties;
      hospital.geometry = req.body.geometry;

      hospital.save()
        .then(() => res.json('Hospital updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
