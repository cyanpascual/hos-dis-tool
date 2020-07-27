const router = require('express').Router();
let Item = require('../models/allocation.model');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds Item info in the facility database
router.route('/add').post((req, res) => {
  const type = req.body.type;
  const properties = req.body.properties;

  const newItem = new Item({
    type,
    properties
});

  newItem.save()
    .then(() => res.json(newItem.id))
    .catch(err => res.status(400).json('Error: ' + err));
});

//finds announcement using id
router.route('/:id').get((req, res) => {
  Item.findById(req.params.id)
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes an item
router.route('/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates info about item
router.route('/update/:id').post((req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.type = req.body.type;
      item.properties = req.body.properties;

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
