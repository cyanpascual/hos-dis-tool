const router = require('express').Router();
let Hospital = require('../models/donationdrive.model');

router.route('/').get((req, res) => {
  Hospital.find()
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const typeOfFeat = req.body.typeOfFeat;
  const google_form = req.body.google_form;
  const properties = req.body.properties;
  const geometry = req.body.geometry;

  const newHospital = new Hospital({
    type,
    typeOfFeat,
    google_form,
    properties,
    geometry
});

  newHospital.save()
    .then(() => res.json('Donation Drive added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Hospital.findById(req.params.id)
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Hospital.findByIdAndDelete(req.params.id)
    .then(() => res.json('Donation Drive deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Hospital.findById(req.params.id)
    .then(hospital => {
      hospital.type = req.body.type;
      hospital.typeOfFeat = req.body.typeOfFeat;
      hospital.google_form = req.body.google_form;
      hospital.properties = req.body.properties;
      hospital.geometry = req.body.geometry;

      hospital.save()
        .then(() => res.json('Donation Drive updated!' + req.body))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
