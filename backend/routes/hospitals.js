const router = require('express').Router();
let Hospital = require('../models/hospital.model');

router.route('/').get((req, res) => {
  Hospital.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const hospitalname = req.body.hospitalname;

  const newHospital = new Hospital({hospitalname});

  newHospital.save()
    .then(() => res.json('Hospital added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;