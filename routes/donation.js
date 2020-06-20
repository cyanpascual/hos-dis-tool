const router = require('express').Router();
let Donation = require('../models/donation.model');

router.route('/').get((req, res) => {
  Donation.find()
    .then(donations => res.json(donations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const properties = req.body.properties;

  const newDonation = new Donation({
    type,
    properties
});

  newDonation.save()
    .then(() => res.json('Donation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Donation.findById(req.params.id)
    .then(donations => res.json(donaions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Donation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Donation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Donation.findById(req.params.id)
    .then(donation => {
      donation.type = req.body.type;
      donation.properties = req.body.properties;

      donation.save()
        .then(() => res.json('Donation updated!' + req.body))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
