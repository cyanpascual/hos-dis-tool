const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require('../models/user.model');
const passport = require("passport");
const validateLoginInput = require("../validation/login");

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

router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ 'properties.Username': email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Username not found" });
      console.log(email)
    }

    // Check password
    if(password===user.properties.Password) {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user._id,
        name: user.properties.Firstname,
        type: user.type
      };

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res
        .status(400)
        .json({ passwordincorrect: "Password incorrect" });
    }
  });
});

module.exports = router;
