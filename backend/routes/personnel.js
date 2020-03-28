const router = require('express').Router();
let Personnel = require('../models/personnel.model');

//gets facility data from database
router.route('/').get((req, res) => {
  Personnel.find()
    .then(personnels => res.json(personnels))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds facility info in the facility database
router.route('/add').post((req, res) => {
  const Surname = req.body.Surname;
  const Firstname = req.body.Firstname;
  const Designation = req.body.Designation;
  const Contact = req.body.Contact;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const HospitalID = req.body.HospitalID;

  const newPersonnel = new Personnel({
    Surname,
    Firstname,
    Designation,
    Contact,
    Email,
    Username,
    Password,
    HospitalID
});

  newPersonnel.save()
    .then(() => res.json('Personnel added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//finds personnel using id
router.route('/:id').get((req, res) => {
  Personnel.findById(req.params.id)
    .then(personnels => res.json(personnels))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a personnel
router.route('/:id').delete((req, res) => {
  Personnel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Personnel deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates info about personnel
router.route('/update/:id').post((req, res) => {
  Personnel.findById(req.params.id)
    .then(personnel => {
        personnel.Surname = req.body.Surname;
        personnel.Firstname = req.body.Firstname;
        personnel.Designation = req.body.Designation;
        personnel.Contact = req.body.Contact;
        personnel.Email = req.body.Email;
        personnel.Username = req.body.Username;
        personnel.Password = req.body.Password;
        personnel.Hospital = req.body.Hospital;

      personnel.save()
        .then(() => res.json('Personnel updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
