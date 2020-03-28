const router = require('express').Router();
let Contributor = require('../models/contributor.model');

//gets Contributor data from database
router.route('/').get((req, res) => {
  Contributor.find()
    .then(contributors => res.json(contributors))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds contributor info in the contributor database
router.route('/add').post((req, res) => {
  const Surname = req.body.Surname;
  const Firstname = req.body.Firstname;
  const Contact = req.body.Contact;
  const Email = req.body.Email;

  const newContributor = new Contributor({
    Surname,
    Firstname,
    Contact,
    Email,
});

  newContributor.save()
    .then(() => res.json('Contributor added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//finds Contributor using id
router.route('/:id').get((req, res) => {
  Contributor.findById(req.params.id)
    .then(contributors => res.json(contributors))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a Contributor
router.route('/:id').delete((req, res) => {
  Contributor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contributor deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates info about Contributor
router.route('/update/:id').post((req, res) => {
  Contributor.findById(req.params.id)
    .then(contributor => {
        contributor.Surname = req.body.Surname;
        contributor.Firstname = req.body.Firstname;
        contributor.Contact = req.body.Contact;
        contributor.Email = req.body.Email;

      contributor.save()
        .then(() => res.json('contributor updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
