const router = require('express').Router();
let Hospital = require('../models/hospital.model');

router.route('/').get((req, res) => {
  Hospital.find()
    .then(hospitals => res.json(hospitals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const Name_of_Ho = req.body.Name_of_Ho;
  const Address = req.body.Address;
  const Google_Plu = req.body.Google_Plu;
  const Supply_Cap = req.body.Supply_Cap;
  const Supply_Cur = req.body.Supply_Cur;
  const Head = req.body.Head;
  const Website = req.body.Website;
  const Contact_Num = Contact_Num;
  const coordinates = req.body.coordinates;

  const newHospital = new Hospital({
    type: "Feature",
    typeofFeat: "hospital",
    properties: {
      Name_of_Ho,
      Address,
      Google_Plu,
      Supply_Cap,
      Supply_Cur,
      Head,
      Website,
      Contact_Num,
    },
    geometry: {
      type: "Point",
      coordinates,
    },
  });

  newHospital.save()
    .then(() => res.json('Hospital added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
