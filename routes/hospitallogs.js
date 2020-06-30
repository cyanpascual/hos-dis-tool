const router = require('express').Router();
let Hospital = require('../models/hospitallog.model');

router.route('/').get((req, res) => {
  Hospital.find()
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const typeOfFeat = req.body.typeOfFeat;
  const data_drop = req.body.data_drop;
  const priority = req.body.priority;
  const test_center = req.body.test_center;
  const numbers = req.body.numbers;
  const properties = req.body.properties;
  const geometry = req.body.geometry;

  const newHospital = new Hospital({
    type,
    typeOfFeat,
    data_drop,
    priority,
    test_center,
    numbers,
    properties,
    geometry
});

  newHospital.save()
    .then(() => res.json('Hospital Log added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Hospital.findById(req.params.id)
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Hospital.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hospital Log deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Hospital.findById(req.params.id)
    .then(hospital => {
      hospital.type = req.body.type;
      hospital.typeOfFeat = req.body.typeOfFeat;
      hospital.data_drop = req.body.data_drop;
      hospital.priority = req.body.priority;
      hospital.test_center = req.body.test_center;
      hospital.numbers = req.body.numbers;
      hospital.properties = req.body.properties;
      hospital.geometry = req.body.geometry;

      hospital.save()
        .then(() => res.json('Hospital Log updated!' + req.body))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
