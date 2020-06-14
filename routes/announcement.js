const router = require('express').Router();
let Item = require('../models/announcement.model');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds facility info in the facility database
router.route('/add').post((req, res) => {
  const code = req.body.code;
  const reportdate = req.body.reportdate;
  const title = req.body.title;
  const content = req.body.content;

  const newItem = new Item({
    code,
    reportdate,
    title,
    content
});

  newItem.save()
    .then(() => res.json('Item added!'))
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
      item.code = req.body.code;
      item.reportdate = req.body.reportdate;
      item.title = req.body.title;
      item.content = req.body.content;

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
