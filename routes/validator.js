const router = require('express').Router();
let Validator = require('../models/validator.model');

//gets validator data from database
router.route('/').get((req, res) => {
  Validator.find()
    .then(validators => res.json(validators))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds validator info in the validator database
router.route('/add').post((req, res) => {
  const Surname = req.body.Surname;
  const Firstname = req.body.Firstname;
  const Contact = req.body.Contact;
  const Email = req.body.Email;
  const Affiliation = req.body.Affiliation;
  const Username = req.body.Username;
  const Password = req.body.Password;

  const newValidator = new Validator({
    Surname,
    Firstname,
    Contact,
    Email,
    Affiliation,
    Username,
    Password,
});

  newValidator.save()
    .then(() => res.json('Validator added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//finds validator using id
router.route('/:id').get((req, res) => {
  Validator.findById(req.params.id)
    .then(validators => res.json(validators))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a Validator
router.route('/:id').delete((req, res) => {
  Validator.findByIdAndDelete(req.params.id)
    .then(() => res.json('Validator deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates info about Validator
router.route('/update/:id').post((req, res) => {
  Validator.findById(req.params.id)
    .then(validator => {
        validator.Surname = req.body.Surname;
        validator.Firstname = req.body.Firstname;
        validator.Contact = req.body.Contact;
        validator.Email = req.body.Email;
        validator.Affiliation = req.body.Affiliation;
        validator.Username = req.body.Username;
        validator.Password = req.body.Password;

      validator.save()
        .then(() => res.json('Validator updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
