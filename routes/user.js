const router = require('express').Router();
let User = require('../models/user.model');

//gets facility data from database
// commented out for data privacy
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds facility info in the facility database
router.route('/add').post((req, res) => {
  const type = req.body.type;
  const properties = req.body.properties;

  const newUser = new User({
    type,
    properties
});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//finds user using id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a user
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Users deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates info about user
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.type = req.body.type;
      user.properties = req.body.properties;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
